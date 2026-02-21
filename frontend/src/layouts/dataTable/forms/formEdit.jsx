// FormEdit.jsx
import { useContext, useEffect, useMemo } from "react";
import { useFetcher } from "react-router-dom";
import styles from "./form.module.css";

import ImageUpload from "./imageUpload/imageUpload";
import ErrorBox from "@components/errorBox/errorBox";

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
    dispatchModal
  } = useContext(DataTableContext);

  const row = singleData?.[0] ?? {};

  const filtered = useMemo(() => inputs.filter((i) => !i.disabled), [inputs]);

  const {
    filteredInputs,
    values,
    errors,
    onChange,
    touchEmptyRequired,
    hasErrors
  } = useFormFields({
    inputs: filtered,
    schema,
    mode: "edit",
    singleData: row
  });

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      onSubmitted();
      dispatchModal({ type: "close" });
    }
  }, [dispatchModal, fetcher.state, fetcher.data, onSubmitted]);

  const url = useMemo(() => {
    if (!manageId || !path[manageId]?.absolute) return null;
    if (!singleData?.[0]?._id) return null;
    return `${path[manageId].absolute}/${singleData[0]._id}/edit`;
  }, [manageId, singleData]);

  const allowed = role && (role === "admin" || role === "manager");
  if (!allowed)
    return <div>This action needs a manager (or someone who looks important)</div>;

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
            />
          </div>

          <fieldset className={styles.fields}>
            <button
              type="button"
              onClick={() => dispatchModal({ type: "view" })}
              className={styles.navigateButton}
              aria-label="View"
            >
              <Eye />
            </button>

            <div>
              <div>
                {inputs.map(({ id, label }) =>
                  id === "_id" ? (
                    <div key={id} className={styles.info}>
                      <span>
                        <p>{label}</p>
                      </span>
                      <span id={id}>
                        <p>{row?.[id]}</p>
                      </span>
                    </div>
                  ) : null
                )}
              </div>

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

              <FormCreatedBy
                placeholder={row?.createdBy ?? "The universe, probably"}
                styles={styles}
              />

              <div className={styles.date}>
                <FormDateRows inputs={inputs} data={row} styles={styles} />
              </div>
            </div>
          </fieldset>
        </div>

        <div className={styles.footer}>
          <div className={styles.errorBox}>
            <ErrorBox>{fetcher.data?.error}</ErrorBox>
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              name="intent"
              value="update"
              disabled={hasErrors}
              onClick={touchEmptyRequired}
              className={styles.primaryBtn}
            >
              Save
            </button>

            <button
              type="submit"
              name="intent"
              value="delete"
              className={styles.dangerBtn}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </fetcher.Form>
  );
};

export default FormEdit;