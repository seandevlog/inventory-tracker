import { useContext, useMemo } from "react";
import { Form } from "react-router-dom";
import styles from "./form.module.css";

import ImageUpload from "./imageUpload/imageUpload";
import FormCreatedBy from "./formEntries/formCreatedBy";
import FormDateRows from "./formEntries/formDateRows";

import AppContext from "@contexts/app.context";
import DataTableContext from "@contexts/dataTable.context";

import Pencil from "@assets/pencil.svg";

import firstCharUppercase from '@utils/firstCharUppercase';

const FormView = () => {
  const { profile } = useContext(AppContext);
  const { role } = profile || {};

  const { FeaturePlaceholder, inputs, singleData, dispatchModal } =
    useContext(DataTableContext);

  const row = singleData?.[0] ?? {};

  const allowed = !!role;

  const hasOptions = useMemo(
    () => inputs?.some((i) => i.options?.length),
    [inputs]
  );

  const handleNavigate = () => dispatchModal({ type: "edit" });

  if (!allowed) return <div>Not allowed</div>;

  return (
    <Form method="post" encType="multipart/form-data" className={styles.formRoot}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.feature}>
            <ImageUpload
              ImagePlaceholder={FeaturePlaceholder}
              mode="view"
              defaultUrl={row?.feature?.url}
            />
          </div>

          <fieldset className={styles.fields}>
            {(role === "admin" || role === "manager") && (
              <button
                type="button"
                onClick={handleNavigate}
                className={styles.navigateButton}
                aria-label="Edit"
              >
                <Pencil />
              </button>
            )}
            <div>
              <div>
                {inputs?.map(
                  ({ id, type, label, defaultValue, options, disabled }) => {
                    if (disabled) return null;
                    if (options) return null;
                    if (id === "createdBy") return null;
                    if (type === "date" || type === "password") return null;

                    const value = defaultValue ?? row?.[id];
                    const display = value || value === 0 ? value : "";

                    return (
                      <div key={id} className={styles.viewInput}>
                        <span className={styles.viewLabel}>{label}</span>
                        <span className={styles.viewValue}>
                          {display || (
                            <span className={styles.viewEmpty}>Empty</span>
                          )}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>

              {hasOptions && (
                <div className={styles.option}>
                  {inputs?.map(({ id, label, options, disabled }) => {
                    if (disabled) return null;
                    if (!options?.length) return null;

                    const value = row?.[id];
                    const display = value || value === 0 ? firstCharUppercase(value) : "";

                    return (
                      <div key={id} className={styles.viewSelect}>
                        <span className={styles.viewLabel}>{label}</span>
                        <span className={styles.viewValue}>
                          {display || (
                            <span className={styles.viewEmpty}>Empty</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <FormCreatedBy
                value={row?.createdByUsername ?? row?.createdBy ?? 'The universe, probably'}
                styles={styles}
              />

              <FormDateRows inputs={inputs} data={row} styles={styles} />
            </div>
          </fieldset>
        </div>
      </div>
    </Form>
  );
};

export default FormView;