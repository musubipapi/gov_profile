export const buildForm = (metaData: {
  type?: string;
  description?: string;
}) => {
  const type = metaData?.type || "input";
  const description = metaData?.description || "";
  switch (type) {
    case "input":
      return (
        <input
          alt={description}
          type="text"
          className="form-input mt-1 w-full focus:ring-primary-200 focus:border-primary-200"
        />
      );
    case "textarea":
      return (
        <textarea
          id="about"
          name="about"
          rows={3}
          className="shadow-sm mt-1 block w-full sm:text-sm focus:ring-primary-200 focus:border-primary-200"
          placeholder={description}
        />
      );
  }
};
