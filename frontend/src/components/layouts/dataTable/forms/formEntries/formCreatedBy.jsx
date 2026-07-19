const FormCreatedBy = ({
  value,
  placeholder = "Unknown",
  styles,
  mode = "view",
}) => {
  if (mode === "create") {
    return value ? (
      <input
        type="hidden"
        id="createdBy"
        name="createdBy"
        value={value}
      />
    ) : null;
  }

  const displayValue = value || placeholder;

  return (
    <div className={styles.metaRow}>
      <span className={styles.metaLabel}>
        Created by
      </span>

      <span className={styles.metaValue}>
        {displayValue}
      </span>

      {mode === "edit" && value && (
        <input
          type="hidden"
          id="createdBy"
          name="createdBy"
          value={value}
        />
      )}
    </div>
  );
};

export default FormCreatedBy;