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

import AppContext from "@contexts/app.context";
import DataTableContext from "@contexts/dataTable.context";

import useFormFields from "@hooks/useFormFields";

import config from "@config";

const { path } = config;

const FormCreate = () => {
  const fetcher = useFetcher();

  const { profile } = useContext(AppContext);
  const { role, username } = profile || {};

  const {
    id: manageId,
    FeaturePlaceholder,
    inputs,
    schema,
    onSubmitted,
    dispatchModal,
  } = useContext(DataTableContext);

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
    mode: "create",
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

  const restrictedForStaff = useMemo(
    () =>
      new Set(
        [
          path.items?.relative,
          path.locations?.relative,
          path.suppliers?.relative,
        ].filter(Boolean)
      ),
    []
  );

  const allowed =
    !!role &&
    !(
      role === "staff" &&
      restrictedForStaff.has(manageId)
    );

  const url = useMemo(() => {
    if (!manageId || !path[manageId]?.absolute) {
      return null;
    }

    return `${path[manageId].absolute}/create`;
  }, [manageId]);

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
              mode="create"
            />
          </div>

          <fieldset className={styles.fields}>
            <legend className={styles.srOnly}>
              Create entry
            </legend>

            <div className={styles.fieldsContent}>
              <FormTextInputs
                inputs={filteredInputs}
                values={values}
                errors={errors}
                onChange={onChange}
                mode="create"
                styles={styles}
              />

              <FormSelectInputs
                inputs={filteredInputs}
                values={values}
                errors={errors}
                onChange={onChange}
                mode="create"
                styles={styles}
              />

              <FormCreatedBy
                value={username}
                mode="create"
                styles={styles}
              />
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
              disabled={hasErrors || isSubmitting}
              onClick={touchEmptyRequired}
              className={styles.primaryBtn}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </footer>
      </div>
    </fetcher.Form>
  );
};

export default FormCreate;