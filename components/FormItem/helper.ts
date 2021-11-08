// Helper fns to transform value to select format and vice versa

export const transformValueToMultiSelect = (value: string) => {
  if (!value) {
    return null;
  }
  return value.split(",").map((value) => ({ value, label: value }));
};

export const transformMultiSelectToValue = (
  valueArray: { value: string; label: string }[]
) => {
  return valueArray.map((value) => value.value).join(",");
};

export const transformValueToSelect = (value: string) => {
  if (
    value.toLocaleLowerCase() === "true" ||
    value.toLocaleLowerCase() === "false"
  ) {
    return {
      value,
      label: value.toLocaleLowerCase() === "true" ? "Yes" : "No",
    };
  }
  return { value, label: value };
};

export const transformSelectToValue = (valueArray: {
  value: string;
  label: string;
}) => {
  return valueArray ? valueArray.value : "";
};
