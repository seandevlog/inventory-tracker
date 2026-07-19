import { useContext, useMemo } from "react";

import styles from "./form.module.css";

import ImageUpload from "./imageUpload/imageUpload";
import FormCreatedBy from "./formEntries/formCreatedBy";
import FormDateRows from "./formEntries/formDateRows";

import AppContext from "@contexts/app.context";
import DataTableContext from "@contexts/dataTable.context";

import Pencil from "@assets/pencil.svg";

import firstCharUppercase from "@utils/firstCharUppercase";

const FormView = () => {
  const { profile } = useContext(AppContext);
  const { role } = profile || {};

  const {
    FeaturePlaceholder,
    inputs,
    singleData,
    dispatchModal,
  } = useContext(DataTableContext);

  const row = singleData?.[0] ?? {};
  const safeInputs = useMemo(() => 
    inputs ?? []
  ,[inputs]);

  const textInputs = useMemo(
    () =>
      safeInputs.filter(
        ({ id, type, options, disabled }) =>
          !disabled &&
          !options?.length &&
          id !== "createdBy" &&
          type !== "date" &&
          type !== "password"
      ),
    [safeInputs]
  );

  const selectInputs = useMemo(
    () =>
      safeInputs.filter(
        ({ options, disabled }) =>
          !disabled && options?.length
      ),
    [safeInputs]
  );

  if (!role) {
    return (
      <div className={styles.permissionMessage}>
        You are not allowed to view this entry.
      </div>
    );
  }

  return (
    <div className={styles.formRoot}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.feature}>
            <ImageUpload
              ImagePlaceholder={FeaturePlaceholder}
              mode="view"
              defaultUrl={row?.feature?.url}
              defaultPublicId={row?.feature?.public_id}
            />
          </div>

          <fieldset
            className={`${styles.fields} ${styles.fieldsWithNavigate}`}
          >
            <legend className={styles.srOnly}>
              Entry information
            </legend>

            {(role === "admin" || role === "manager") && (
              <button
                type="button"
                onClick={() =>
                  dispatchModal({ type: "edit" })
                }
                className={styles.navigateButton}
                aria-label="Edit entry"
              >
                <Pencil />
              </button>
            )}

            <div className={styles.fieldsContent}>
              {textInputs.length > 0 && (
                <div className={styles.viewGrid}>
                  {textInputs.map(
                    ({ id, label, defaultValue }) => {
                      const value =
                        defaultValue ?? row?.[id];

                      const hasValue =
                        value !== undefined &&
                        value !== null &&
                        value !== "";

                      return (
                        <div
                          key={id}
                          className={styles.viewInput}
                        >
                          <span
                            className={styles.viewLabel}
                          >
                            {label}
                          </span>

                          <span
                            className={styles.viewValue}
                          >
                            {hasValue ? (
                              String(value)
                            ) : (
                              <span
                                className={
                                  styles.viewEmpty
                                }
                              >
                                Empty
                              </span>
                            )}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              {selectInputs.length > 0 && (
                <div className={styles.viewGrid}>
                  {selectInputs.map(({ id, label }) => {
                    const value = row?.[id];

                    const hasValue =
                      value !== undefined &&
                      value !== null &&
                      value !== "";

                    return (
                      <div
                        key={id}
                        className={styles.viewSelect}
                      >
                        <span
                          className={styles.viewLabel}
                        >
                          {label}
                        </span>

                        <span
                          className={styles.viewValue}
                        >
                          {hasValue ? (
                            firstCharUppercase(
                              String(value)
                            )
                          ) : (
                            <span
                              className={
                                styles.viewEmpty
                              }
                            >
                              Empty
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className={styles.metaSection}>
                <FormCreatedBy
                  value={
                    row?.createdByUsername ??
                    row?.createdBy
                  }
                  placeholder="Unknown"
                  mode="view"
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
      </div>
    </div>
  );
};

export default FormView;