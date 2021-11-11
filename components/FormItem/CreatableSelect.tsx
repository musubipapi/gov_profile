import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Select from "react-select/creatable";
import { transformSelectToValue, transformValueToSelect } from "./helper";

interface ICreatableSelect {
  name: string;
  onChange: (value: string) => void;
  handleFillFormWithPK: (row?: number) => Promise<void>;
  value: string;
}

export const CreatableSelect: FC<ICreatableSelect> = ({
  name,
  onChange,
  handleFillFormWithPK,
  value,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  // option order is used to pull latest row data
  const [optionsOrder, setOptionsOrder] = useState(new Map());

  //Gets all the values of the primary key column
  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/form/values?name=${name}&type=pk`).then((pk) => {
      const rawOptions = (pk.data as any).data
        .splice(2)
        .map((option: string[]) => option[0]);

      rawOptions.map(
        (option: any, idx: any) =>
          isMounted && setOptionsOrder(new Map(optionsOrder.set(option, idx)))
      );

      const options = (Array.from(new Set(rawOptions)) as string[]).map(
        (name: string) => transformValueToSelect(name)
      );
      isMounted && setOptions(options);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreate = async (inputValue: string) => {
    setIsLoading(true);
    const newOption = transformValueToSelect(inputValue);
    setOptions((prevOptions) => [...prevOptions, newOption]);
    await handleFillFormWithPK();
    onChange(transformSelectToValue(newOption as any));
    setIsLoading(false);
  };

  return (
    <Select
      captureMenuScroll
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={async (val) => {
        await handleFillFormWithPK(optionsOrder.get(val?.value) + 3);
        onChange(transformSelectToValue(val as any));
        // +3 since all data rows in spreadsheet begin on row 3
      }}
      onCreateOption={handleCreate}
      options={options as any}
      value={transformValueToSelect(value)}
    />
  );
};
