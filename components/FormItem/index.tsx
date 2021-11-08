import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { useTheme } from "@chakra-ui/react";

import Select from "react-select";

import React, { FC } from "react";
import * as styles from "./styles";
import {
  transformMultiSelectToValue,
  transformSelectToValue,
  transformValueToMultiSelect,
  transformValueToSelect,
} from "./helper";
import { CreatableSelect } from "./CreatableSelect";

interface IFormItem {
  metadata: {
    primaryKey?: boolean;
    hideAttribute?: boolean;
    type: string;
    question: string;
    categories?: string[];
    description: string;
  };
  value: string;
  name: string;
  handleFillFormWithPK: (row?: number) => Promise<void>;
  onChange: (value: string) => void;
}

/* 
FormItem is used to dynamicallly return the type of input specified by metadata described in the Google Sheets
*/
export const FormItem: FC<IFormItem> = ({
  name,
  metadata,
  value,
  onChange,
  handleFillFormWithPK,
}) => {
  const { primaryKey, type, categories, description } = metadata || {};

  const { colors } = useTheme();
  let categoryArray;
  if (primaryKey) {
    return (
      <CreatableSelect
        handleFillFormWithPK={handleFillFormWithPK}
        name={name}
        onChange={onChange}
        value={value}
      />
    );
  }
  switch (type) {
    case "textarea":
      return (
        <Textarea
          pl={2}
          focusBorderColor="primary.200"
          rows={3}
          className="shadow-sm mt-1 block w-full sm:text-sm focus:ring-primary-200 focus:border-primary-200"
          placeholder={description}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "select":
      categoryArray = categories?.map((category) => ({
        value: category,
        label: category,
      }));

      return (
        <Select
          placeholder={description}
          captureMenuScroll
          isClearable
          styles={styles.customSelectStyles(colors)}
          onChange={(val) => onChange(transformSelectToValue(val as any))}
          options={categoryArray}
          value={transformValueToSelect(value)}
        />
      );
    case "multi-select":
      categoryArray = categories?.map((category) => ({
        value: category,
        label: category,
      }));

      return (
        <Select
          placeholder={description}
          captureMenuScroll
          isClearable
          styles={styles.customSelectStyles(colors)}
          isMulti
          onChange={(val) => onChange(transformMultiSelectToValue(val as any))}
          options={categoryArray}
          value={transformValueToMultiSelect(value)}
        />
      );
    case "boolean":
      categoryArray = [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
      ];
      return (
        <Select
          placeholder={description}
          captureMenuScroll
          isClearable
          styles={styles.customSelectStyles(colors)}
          onChange={(val) => onChange(transformSelectToValue(val as any))}
          options={categoryArray}
          value={transformValueToSelect(value)}
        />
      );

    case "input":
    default:
      return (
        <Input
          pl={2}
          focusBorderColor="primary.200"
          alt={description}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
};
