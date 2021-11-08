export const customSelectStyles = (colors: any) => ({
  input: (provided: any, state: any) => ({
    ...provided,
    height: "32px",
  }),
  control: (provided: any, state: any) => {
    return {
      ...provided,
      boxShadow: "none",
      borderRadius: "var(--chakra-radii-md)",
      borderWidth: state.isFocused ? "2px" : provided.borderWidth,
      borderColor: state.isFocused
        ? colors.primary["200"]
        : provided.borderColor,
      "&:hover": {
        borderColor: state.isFocused
          ? colors.primary["200"]
          : provided.borderColor,
      },
    };
  },
});
