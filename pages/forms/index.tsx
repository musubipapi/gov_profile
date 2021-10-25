import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { ethers } from "ethers";
import type { NextPage } from "next";
import Router, { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { FormItem } from "../../components/FormItem";
import { Layout } from "../../components/Layout";
import { useGetForm } from "../../hooks/use-get-form-data";
import { buildForm } from "../../utils/formbuilder";

const Spacing = ({ children }: { children: ReactElement }) => (
  <div className="my-5 flex-col">{children}</div>
);

const Form: NextPage = () => {
  const { account } = useWeb3React();
  const router = useRouter();
  const { name } = router.query;

  // if form name doesn't exist send to main page
  if (!name) {
    router.push("/");
  }
  const [formValues, setFormValues] = useState(new Map());
  const updateFormValues = (k: any, v: any) => {
    setFormValues(new Map(formValues.set(k, v)));
  };
  const { form, isLoading } = useGetForm(name as string);
  const { questions } = !isLoading && form;

  const [questionRow, metadataRow] = questions || [];

  useEffect(() => {
    if (questionRow) {
      questionRow.map((item: string) => {
        updateFormValues(item, "");
      });
      updateFormValues("Wallet", account);
    }
  }, [questionRow]);
  const questionComponent = questionRow
    ?.slice(1)
    .map((question: string, idx: number) => {
      const index = idx + 1; //true index since we sliced out wallet col
      let metadata;
      if (index in metadataRow) {
        try {
          metadata = JSON.parse(metadataRow[index]);
        } catch (e) {}
      }
      return (
        <Spacing key={question}>
          <>
            <div className="text-lg">{question}</div>
            <FormItem
              type={metadata?.type}
              description={metadata?.description}
              onChange={(value: string) => updateFormValues(question, value)}
              value={formValues.get(question)}
            />
          </>
        </Spacing>
      );
    });

  return (
    <Layout>
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
    </Layout>
  );
};

export default Form;
