import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { ethers } from "ethers";
import type { NextPage } from "next";
import Router, { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { FormItem } from "../../components/FormItem";
import { Layout } from "../../components/Layout";
import { LoadingComponent } from "../../components/LoadingComponent";
import { useGetForm } from "../../hooks/use-get-form-data";

const Spacing = ({ children }: { children: ReactElement }) => (
  <div className="my-5 flex-col">{children}</div>
);

const Form: NextPage = () => {
  const { account } = useWeb3React();
  const router = useRouter();
  const name = router.query.name;

  // if form name doesn't exist send to main page
  if (!name) {
    router.push("/");
  }
  const [formValues, setFormValues] = useState(new Map());

  const updateFormValues = (k: any, v: any) => {
    setFormValues(new Map(formValues.set(k, v)));
  };
  const { form, isLoading } = useGetForm(name as string);
  const { data } = !isLoading && form;

  const [attributeRow, metadataRow] = data || [];

  useEffect(() => {
    if (attributeRow) {
      attributeRow.map((item: string) => {
        updateFormValues(item, "");
      });
      updateFormValues("Wallet", account);
    }
  }, [attributeRow]);

  const handleFillFormWithPK = async (row?: number) => {
    try {
      console.log(row);
      if (!row) {
        throw "No row number";
      }
      const pkRow = (
        (await axios.get(
          `/api/form/values?name=${name}&type=row&row=${row}`
        )) as any
      ).data.data;
      if (!pkRow) {
        throw "No primary key row";
      }
      attributeRow.map((item: string, idx: number) => {
        updateFormValues(item, pkRow[0][idx]);
      });
    } catch (e) {
      attributeRow.map((item: string, idx: number) => {
        updateFormValues(item, "");
      });
    }

    updateFormValues("Wallet", account);
  };

  const questionComponent = attributeRow
    ?.slice(1)
    .map((attribute: string, idx: number) => {
      const index = idx + 1; //true index since we sliced out wallet col
      let metadata;
      if (index in metadataRow) {
        try {
          metadata = JSON.parse(metadataRow[index]);
        } catch (e) {}
      }
      if (metadata?.hideAttribute === true) {
        return null;
      }
      return (
        <Spacing key={attribute}>
          <>
            <div className="text-lg">{metadata?.question ?? attribute}</div>
            <FormItem
              name={name as string}
              handleFillFormWithPK={handleFillFormWithPK}
              metadata={metadata}
              onChange={(value: string) => {
                updateFormValues(attribute, value);
              }}
              value={formValues.get(attribute) || ""}
            />
          </>
        </Spacing>
      );
    });

  return (
    <Layout>
      {!isLoading && (
        <div className="mt-10 mb-24">
          <h1 className="text-3xl text-center">{name} Form</h1>
          {questionComponent}
          <button
            onClick={() => {
              axios
                .post(`/api/form?name=${name}`, {
                  formValues: Array.from(formValues.values()),
                })
                .then((_) => Router.push("/forms/submitted"))
                .catch((_) => Router.push("/forms/error"));
            }}
            className="bg-primary-100 hover:bg-primary-200 font-bold mt-4 py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      )}
      {isLoading && <LoadingComponent />}
    </Layout>
  );
};

export default Form;
