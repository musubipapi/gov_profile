import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormItem } from "../../components/FormItem";

import { Layout } from "../../components/Layout";
import { useGetForm } from "../../hooks/use-get-form-data";

import { getPkArray } from "../../common/get-pk-array";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { LoadingComponent } from "../../components/LoadingComponent";

const FormPage: NextPage = () => {
  const { account } = useWeb3React();
  const router = useRouter();
  const toast = useToast();

  const name = router.query.name;
  const id = router.query.id;

  if (!name) {
    router.push("/");
  }
  if (!id) {
    router.push(`/forms?name=${name}`);
  }

  const [formValues, setFormValues] = useState(new Map());

  const { form, isLoading } = useGetForm(name as string);
  const { data } = !isLoading && form;
  const [attributeRow, metadataRow] = data || [];
  const [DAO, setDAO] = useState("");

  const [isDAOValuesLoading, setIsDAOValuesLoading] = useState(true);

  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const [goToNext, setGoToNext] = useState(false);

  useEffect(() => {
    setGoToNext(false);
    setAlreadyReviewed(false);
    setIsDAOValuesLoading(true);
    setDAO("");
  }, [id]);

  useEffect(() => {
    setIsDAOValuesLoading(true);
    if (attributeRow) {
      axios
        .get(`/api/form/values?name=${name}&type=row&row=${Number(id) + 2}`)
        .then((data: any) => {
          const attrValues = data?.data?.data[0];
          const DAOName = data?.data?.data[0][1];
          setDAO(DAOName);
          attributeRow.map((item: string, idx: number) => {
            updateFormValues(item, attrValues[idx]);
          });
          updateFormValues("Wallet", account);
          setIsDAOValuesLoading(false);
        });
    }
  }, [attributeRow, id]);

  useEffect(() => {
    if (!isDAOValuesLoading) {
      getPkArray(name as string).then((options) => {
        const exists = options.find((i: any) => i.value === DAO);
        if (!exists) {
          setAlreadyReviewed(true);
        }
      });
    }
  }, [DAO, isDAOValuesLoading]);

  const updateFormValues = (k: any, v: any) => {
    setFormValues(new Map(formValues.set(k, v)));
  };

  const handleFillFormWithPK = async (row?: number) => {
    try {
      if (!row) {
        throw "No row number";
      }
      const pkRow = (
        (await axios.get(
          `/api/form/values?name=${name}&type=row&row=${row}`
        )) as any
      ).data?.data;
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
      const index = idx + 1; //true index since we sliced out wallet;
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
        <Box fontSize="lg" key={attribute + "-" + idx}>
          {metadata?.question ?? attribute}
          <FormItem
            name={name as string}
            handleFillFormWithPK={handleFillFormWithPK}
            metadata={metadata}
            onChange={(value: string) => {
              updateFormValues(attribute, value);
            }}
            value={formValues.get(attribute) || ""}
          />
        </Box>
      );
    });

  const submitHandler = async () => {
    const pkArray = (await getPkArray(name as string)).map(
      (item: any) => item.value
    );

    if (!(DAO in pkArray)) {
      toast({
        title: `This DAO has already been reviewed.`,
        position: "top",
        status: "error",
        isClosable: true,
      });
      setGoToNext(true);

      throw new Error("already reviewed");
    }

    axios
      .post(`/api/form?name=QA_${name}`, {
        formValues: Array.from(formValues.values()),
      })
      .then((_) => {
        toast({
          title: `Successfully Submitted!`,
          position: "top",
          status: "success",
          isClosable: true,
        });
        setGoToNext(true);
      })
      .catch((_) => {
        toast({
          title: `There was an error in submission!`,
          position: "top",
          status: "error",
          isClosable: true,
        });
      });
  };

  const nextPageHandler = async () => {
    const pkArray = await getPkArray(name as string, Number(id));
    const row = pkArray[0]?.label.split("-")[0];
    router.push(`/forms/page?name=${name}&id=${Number(row)}`);
  };

  return (
    <Layout>
      {!isDAOValuesLoading && !isLoading && (
        <>
          <Text mb="12" textAlign="center" fontSize="2xl">
            Data Sheet
          </Text>
          <Stack spacing="5">
            <Text fontSize="2xl" as="span">
              Current DAO:{" "}
              <Box
                as="span"
                color="primary.200"
                fontWeight="bold"
                fontSize="3xl"
              >
                {DAO}
              </Box>
            </Text>

            {!alreadyReviewed && questionComponent}
            {alreadyReviewed && <AlreadyReviewedComponent />}
          </Stack>

          <Button
            colorScheme={goToNext || alreadyReviewed ? "pink" : "green"}
            my="12"
            onClick={
              goToNext || alreadyReviewed ? nextPageHandler : submitHandler
            }
          >
            {goToNext || alreadyReviewed ? "Next" : "Submit"}
          </Button>
        </>
      )}
      {isDAOValuesLoading || (isLoading && <LoadingComponent />)}
    </Layout>
  );
};

const AlreadyReviewedComponent = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z" />
      </svg>
      <div className="mt-8 text-center">
        Looks like this DAO has already been reviewed, please press "Next" to
        continue onto the next one.
      </div>
    </Box>
  );
};

export default FormPage;
