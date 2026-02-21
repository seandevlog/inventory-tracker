import { useRef, useEffect, useState, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { filter } from "lodash";

import styles from "./imageUpload.module.css";
import ErrorBox from "@components/errorBox/errorBox";
import DataTableContext from "@contexts/dataTable.context";

const ALLOWED_TYPES = new Set(["image/png", "image/jpg", "image/jpeg"]);

const ImageUpload = ({
  disabled = false, ImagePlaceholder, defaultUrl, mode = "edit", // "create" | "edit" | "view"
}) => {
  const params = useParams();
  const paramId = params ? Object.values(params)?.[0] : "";

  const { groupData } = useContext(DataTableContext);

  const matched = useMemo(() => {
    if (!groupData?.length || !paramId) return [];
    return filter(groupData, { _id: paramId });
  }, [groupData, paramId]);

  const existingUrl =
    defaultUrl ??
    matched?.[0]?.feature?.url ??
    "";

  const existingPublicId =
    matched?.[0]?.feature?.public_id ?? "";

  const [previewUrl, setPreviewUrl] = useState("");
  const [errorBox, setErrorBox] = useState(false);

  const fileInputRef = useRef(null);

  const isReadOnly = mode === "view" || disabled;

  const shownUrl = previewUrl || existingUrl;

  const handleFeature = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.has(file.type)) {
      setErrorBox(true);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setErrorBox(false);

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const nextPreview = URL.createObjectURL(file);
    setPreviewUrl(nextPreview);
  };

  useEffect(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }
    setErrorBox(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [existingUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <fieldset className={styles.feature}>
      <legend></legend>

      {shownUrl ? <img src={shownUrl} alt="Feature" /> : <ImagePlaceholder />}

      {!isReadOnly && (
        <div className={styles.fileInput}>
          <label htmlFor="feature">Upload File</label>
          <input
            id="feature"
            type="file"
            name="feature"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFeature}
            ref={fileInputRef}
          />
        </div>
      )}

      <input
        type="hidden"
        name="public_id"
        value={existingPublicId}
        disabled={!existingPublicId}
      />

      {errorBox && <ErrorBox>Only accepts PNG, JPG, JPEG</ErrorBox>}
    </fieldset>
  );
};

export default ImageUpload;