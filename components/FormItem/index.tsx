import React, { FC } from "react";

interface IFormItem {
  type?: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
}

export const FormItem: FC<IFormItem> = ({
  type = "input",
  description = "",
  value,
  onChange,
}) => {
  switch (type) {
    case "textarea":
      return (
        <textarea
          id="about"
          name="about"
          rows={3}
          className="shadow-sm mt-1 block w-full sm:text-sm focus:ring-primary-200 focus:border-primary-200"
          placeholder={description}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "input":
    default:
      return (
        <input
          alt={description}
          type="text"
          className="form-input mt-1 w-full focus:ring-primary-200 focus:border-primary-200"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
};
