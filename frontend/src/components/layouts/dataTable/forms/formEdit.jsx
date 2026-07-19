import {
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useFetcher } from "react-router-dom";

import styles from "./form.module.css";

import ImageUpload from "./imageUpload/imageUpload";
import ErrorBox from "@components/ui/errorBox/errorBox";

import FormTextInputs from "./formEntries/formTextInputs";
import FormSelectInputs from "./formEntries/formSelectInputs";
import FormCreatedBy from "./formEntries/formCreatedBy";
import FormDateRows from "./formEntries/formDateRows";

import AppContext from "@contexts/app.context";
import DataTableContext from "@contexts/dataTable.context";

import useFormFields from "@hooks/useFormFields";

import Eye from "@assets/eye.svg";

import config from "@config";

const { path } = config;

const FormEdit = () => {
  const fetcher = useFetcher();

  const { profile } = useContext(AppContext);
  const { role } = profile || {};

  const {
    id: manageId,
    FeaturePlaceholder,
    inputs,
    schema,
    singleData,
    onSubmitted,
    dispatchModal,
  } = useContext(DataTableContext);

  const row = singleData?.[0] ?? {};
  const safeInputs = useMemo(() => 
    inputs ?? []
  ,[inputs]);

  const filtered = useMemo(
    () => safeInputs.filter((input) => !input.disabled),
    [safeInputs]
  );

  const {
    filteredInputs,
    values,
    errors,
    onChange,
    touchEmptyRequired,
    hasErrors,
  } = useFormFields({
    inputs: filtered,
    schema,
    mode: "edit",
    singleData: row,
  });

  const isSubmitting = fetcher.state !== "idle";

  useEffect(() => {
    if (
      fetcher.state === "idle" &&
      fetcher.data?.success
    ) {
      onSubmitted?.();
      dispatchModal({ type: "close" });
    }
  }, [
    dispatchModal,
    fetcher.state,
    fetcher.data,
    onSubmitted,
  ]);

  const url = useMemo(() => {
    if (!manageId || !path[manageId]?.absolute) {
      return null;
    }

    if (!row?._id) return null;

    return `${path[manageId].absolute}/${row._id}/edit`;
  }, [manageId, row._id]);

  const allowed =
    role === "admin" || role === "manager";

  if (!allowed) {
    return (
      <div className={styles.permissionMessage}>
        This action requires a manager or administrator.
      </div>
    );
  }

  return (
    <fetcher.Form
      method="post"
      encType="multipart/form-data"
      action={url ?? undefined}
      className={styles.formRoot}
    >
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.feature}>
            <ImageUpload
              ImagePlaceholder={FeaturePlaceholder}
              mode="edit"
              defaultUrl={row?.feature?.url}
              defaultPublicId={row?.feature?.public_id}
            />
          </div>

          <fieldset
            className={`${styles.fields} ${styles.fieldsWithNavigate}`}
          >
            <legend className={styles.srOnly}>
              Edit entry
            </legend>

            <button
              type="button"
              onClick={() =>
                dispatchModal({ type: "view" })
              }
              className={styles.navigateButton}
              aria-label="Return to entry view"
            >
              <Eye />
            </button>

            <div className={styles.fieldsContent}>
              {row?._id && (
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>
                    ID
                  </span>

                  <span className={styles.metaValue}>
                    {row._id}
                  </span>
                </div>
              )}

              <FormTextInputs
                inputs={filteredInputs}
                values={values}
                errors={errors}
                onChange={onChange}
                mode="edit"
                singleData={row}
                styles={styles}
              />

              <FormSelectInputs
                inputs={filteredInputs}
                values={values}
                errors={errors}
                onChange={onChange}
                mode="edit"
                singleData={row}
                styles={styles}
              />

              <div className={styles.metaSection}>
                <FormCreatedBy
                  value={
                    row?.createdByUsername ??
                    row?.createdBy
                  }
                  placeholder="Unknown"
                  mode="edit"
                  styles={styles}
                />

                <FormDateRows
                  inputs={safeInputs}
                  data={row}
                  styles={styles}
                />
              </div>
            </div>
          </fieldset>
        </div>

        <footer className={styles.footer}>
          <div className={styles.errorBox}>
            <ErrorBox>
              {fetcher.data?.error}
            </ErrorBox>
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              name="intent"
              value="update"
              disabled={hasErrors || isSubmitting}
              onClick={touchEmptyRequired}
              className={styles.primaryBtn}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>

            <button
              type="submit"
              name="intent"
              value="delete"
              disabled={isSubmitting}
              className={styles.dangerBtn}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </fetcher.Form>
  );
};

export default FormEdit;