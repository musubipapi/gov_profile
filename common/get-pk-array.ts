import axios from "axios";

/*
 * returns the Primary Key which haven't be QA'd by comparing the raw sheet and QA sheet
 */
export const getPkArray = async (name: string, index?: number) => {
  const rawPK = axios.get(`/api/form/values?name=${name}&type=pk`);
  const qaPK = axios.get(`/api/form/values?name=QA_${name}&type=pk`);

  const result = await Promise.all([rawPK, qaPK]);
  let [rawPkArray, qaPKArray] = result.map((arr: any) =>
    arr.data?.data?.splice(2).map((item: string[]) => item[0])
  );
  rawPkArray = rawPkArray.map((item: string, index: number) => ({
    value: item,
    label: `${index + 1} - ${item}`,
  }));

  if (index !== undefined) {
    rawPkArray = rawPkArray.splice(index).concat(rawPkArray);
  }
  const filteredArray = rawPkArray?.reduce(
    (
      accumulatedArray: string[],
      currentItem: { value: string; label: string }
    ) => {
      if (!qaPKArray.includes(currentItem.value)) {
        return [...accumulatedArray, currentItem];
      }
      return accumulatedArray;
    },
    []
  );

  return filteredArray;
};
