const FormDateRows = ({
  inputs,
  data,
  styles,
}) => {
  return (
    <>
      {(inputs ?? []).map(
        ({ id, type, label }) => {
          if (type !== "date") return null;

          const rawValue = data?.[id];
          const date = rawValue
            ? new Date(rawValue)
            : null;

          const isValid =
            date && !Number.isNaN(date.getTime());

          const display = isValid
            ? date.toLocaleString(undefined, {
                weekday: "long",
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Empty";

          return (
            <div
              key={id}
              className={styles.metaRow}
            >
              <span className={styles.metaLabel}>
                {label}
              </span>

              <span className={styles.metaValue}>
                {isValid ? (
                  <time dateTime={date.toISOString()}>
                    {display}
                  </time>
                ) : (
                  display
                )}
              </span>
            </div>
          );
        }
      )}
    </>
  );
};

export default FormDateRows;