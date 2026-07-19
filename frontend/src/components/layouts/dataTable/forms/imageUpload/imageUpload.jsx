import {
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import styles from "./imageUpload.module.css";

import ErrorBox from "@components/ui/errorBox/errorBox";
import DataTableContext from "@contexts/dataTable.context";

const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
]);

const ImageUpload = ({
  disabled = false,
  ImagePlaceholder,
  defaultUrl = "",
  defaultPublicId = "",
  mode = "edit",
}) => {
  const inputId = useId();
  const fileInputRef = useRef(null);

  const params = useParams();
  const paramId = Object.values(params ?? {})[0] ?? "";

  const { groupData } = useContext(DataTableContext);

  const matchedRow = useMemo(
    () =>
      (groupData ?? []).find(
        (entry) => entry?._id === paramId
      ),
    [groupData, paramId]
  );

  const existingUrl =
    defaultUrl ||
    matchedRow?.feature?.url ||
    "";

  const existingPublicId =
    defaultPublicId ||
    matchedRow?.feature?.public_id ||
    "";

  const [previewUrl, setPreviewUrl] =
    useState("");
  const [error, setError] = useState("");

  const isReadOnly =
    mode === "view" || disabled;

  const shownUrl = previewUrl || existingUrl;

  const handleFeature = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_TYPES.has(file.type)) {
      setError(
        "Only PNG, JPG, and JPEG files are accepted."
      );

      event.target.value = "";
      return;
    }

    setError("");
    setPreviewUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    setPreviewUrl("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [existingUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <fieldset className={styles.feature}>
      <legend className={styles.srOnly}>
        Feature image
      </legend>

      <div className={styles.preview}>
        {shownUrl ? (
          <img
            src={shownUrl}
            alt="Feature preview"
          />
        ) : ImagePlaceholder ? (
          <ImagePlaceholder />
        ) : (
          <span className={styles.emptyPreview}>
            No image
          </span>
        )}
      </div>

      {!isReadOnly && (
        <div className={styles.fileInput}>
          <button
            type="button"
            className={styles.uploadButton}
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            {shownUrl
              ? "Change image"
              : "Upload image"}
          </button>

          <input
            id={inputId}
            type="file"
            name="feature"
            accept=".png,.jpg,.jpeg,image/png,image/jpeg"
            onChange={handleFeature}
            ref={fileInputRef}
          />
        </div>
      )}

      {existingPublicId && (
        <input
          type="hidden"
          name="public_id"
          value={existingPublicId}
        />
      )}

      {error && (
        <div className={styles.uploadError}>
          <ErrorBox>{error}</ErrorBox>
        </div>
      )}
    </fieldset>
  );
};

export default ImageUpload;