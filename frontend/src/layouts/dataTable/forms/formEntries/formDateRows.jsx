const FormDateRows = ({ inputs, data, styles }) => {
  return (
    <>
      {inputs?.map(({ id, type, label }) => {
        if (type !== "date") return null;

        const value = data?.[id];

        const display = value
          ? new Date(value).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "2-digit",
              year: "numeric",
              minute: "2-digit",
              hour: "2-digit",
            })
          : "Empty";

        return (
          <div key={id} className={styles.info}>
            <span><p>{label}</p></span>
            <span id={id}><p>{display}</p></span>
          </div>
        );
      })}
    </>
  );
};

export default FormDateRows;