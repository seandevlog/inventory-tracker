import { useMemo, useReducer, useCallback } from "react";

const buildInitialValues = ({ inputs, mode, singleData }) => {
  const values = {};
  for (const input of inputs) {
    const { id, defaultValue, disabled } = input;
    if (disabled) continue;

    if (mode === "create") values[id] = defaultValue ?? "";

    if (mode === "edit" || mode === "view" ) values[id] = singleData?.[id] || defaultValue || "";
  }
  return values;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "change": {
      const { id, value, validate } = action.payload;
      const errorMessage = validate ? (validate(value) ?? "") : "";

      return {
        ...state,
        values: { ...state.values, [id]: value },
        errors: { ...state.errors, [id]: errorMessage },
      };
    }

    case "touch": {
      const { getEffectiveValue, validateField, ids } = action.payload;

      const nextErrors = { ...state.errors };

      for (const id of ids) {
        const raw = state.values?.[id];

        if ((raw === "" || raw === null || typeof raw === "undefined") && !nextErrors[id]) {
          const effective = getEffectiveValue(id, raw);
          const err = validateField(id, effective) ?? "";
          nextErrors[id] = err;
        }
      }

      return { ...state, errors: nextErrors };
    }

    default:
      return state;
  }
};

export default function useFormFields({ inputs, schema, mode = "create", singleData = null }) {
  const filteredInputs = useMemo(
    () => inputs.filter((i) => !i.disabled),
    [inputs]
  );

  const effectiveSchema = useMemo(() => {
    if (mode !== "edit") return schema;

    const keys = schema?._ids?._byKey?.keys?.().toArray?.() ?? [];
    return schema.fork(keys, (field) => field.optional().allow(null, ""));
  }, [schema, mode]);

  const validators = useMemo(() => {
    const map = {};
    for (const { id } of filteredInputs) {
      map[id] = (value) => {
        const { error } = effectiveSchema.extract(id).validate(value);
        return error?.message ?? "";
      };
    }
    return map;
  }, [filteredInputs, effectiveSchema]);

  const [state, dispatch] = useReducer(reducer, null, () => ({
    values: buildInitialValues({ inputs: filteredInputs, singleData, mode }),
    errors: Object.fromEntries(filteredInputs.map(({ id }) => [id, ""])),
  }));

  const onChange = useCallback(
    (id, value) => {
      dispatch({
        type: "change",
        payload: { id, value, validate: validators[id] },
      });
    },
    [validators]
  );

  const touchEmptyRequired = useCallback(() => {
    const ids = filteredInputs.map((i) => i.id);

    dispatch({
      type: "touch",
      payload: {
        ids,
        getEffectiveValue: (id, raw) => {
          if (mode === "edit") {
            // if user didn't type, validate against existing value
            const fallback = singleData?.[id];
            return (raw === "" || raw === null || typeof raw === "undefined")
              ? (fallback ?? raw)
              : raw;
          }
          return raw;
        },
        validateField: (id, value) => validators[id]?.(value) ?? "",
      },
    });
  }, [filteredInputs, mode, singleData, validators]);

  const hasErrors = useMemo(
    () => filteredInputs.some(({ id }) => Boolean(state.errors?.[id])),
    [filteredInputs, state.errors]
  );

  return {
    filteredInputs,
    values: state.values,
    errors: state.errors,
    onChange,
    touchEmptyRequired,
    hasErrors,
  };
}