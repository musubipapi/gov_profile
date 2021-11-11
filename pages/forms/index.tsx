import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { LoadingComponent } from "../../components/LoadingComponent";
import Select from "react-select";
import { getPkArray } from "../../common/get-pk-array";
import { Box, Button, Stack, Text, useTheme } from "@chakra-ui/react";
import * as styles from "../../components/FormItem/styles";

const Form: NextPage = () => {
  const router = useRouter();
  const name = router.query.name;

  // if form name doesn't exist send to main page
  if (!name) {
    router.push("/");
  }

  const [value, setValue] = useState<
    { value: String; label: string } | undefined
  >(undefined);
  const [isDAOLoading, setIsDAOLoading] = useState(true);
  const [options, setOptions] = useState<{ value: String; label: string }[]>(
    []
  );
  const { colors } = useTheme();

  useEffect(() => {
    getPkArray(name as string).then((pkArray) => {
      setOptions(pkArray);
      setIsDAOLoading(false);
    });
  }, [name]);

  const handleContinue = () => {
    const option = options.find((option) => option.value === value?.value);
    const id = option?.label.split("-")[0];
    router.push(`/forms/page?name=${name}&id=${Number(id)}`);
  };

  return (
    <Layout>
      {!isDAOLoading && (
        <>
          <Stack spacing="6">
            <Text fontSize="2xl" textAlign="center">
              DAO Data Entry
            </Text>
            {/* <Text>
              Before Diamond DAO had fully coalesced as an organization, we set
              the intention of building a reference dataset on DAOs that
              Chainverse could draw from as a "DAOrectory."
            </Text>
            <Text>
              The DAOrectory was supposed to include key context on DAOs covered
              by Chainverse, including (i) DAO type (i.e. Product/Grants) , (ii)
              DAO identifiers (i.e. Discord/Website), and other information
              critical for understanding and analyzing DAOs (i.e. membership
              requirements).
            </Text>
            <Text>
              Our products will rely on this reference dataset to deliver
              metrics and insights to users; for instance, without understanding
              the membership requirements of a DAO, it's impossible for
              Chainverse to report on how many members a DAO has.
            </Text>
            <Text>
              We are building the DAOrectory through work-streams (i) automated
              data collection (i.e. building pipelines to scrape data from the
              Snapshot API and the DAOhaus Subgraph) and (ii) manual data
              collection (i.e. visiting the websites and Discords of DAOs to
              collect key information that we cannot scrape.)
            </Text> */}
            <div>
              <Box my="6">
                <Text fontWeight="600">Select a DAO to start from:</Text>
              </Box>
              <Select
                placeholder="Select a DAO from the dropdown or type to filter"
                captureMenuScroll
                isClearable
                styles={styles.customSelectStyles(colors)}
                onChange={(val: any) => setValue(val)}
                options={options as any}
                value={value}
              />
            </div>
            {value && (
              <Button
                backgroundColor="primary.100"
                _hover={{ backgroundColor: "primary.200" }}
                onClick={handleContinue}
              >
                Continue
              </Button>
            )}
          </Stack>
        </>
      )}
      {isDAOLoading && <LoadingComponent />}
    </Layout>
  );
};

export default Form;
