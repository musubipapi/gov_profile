import useSWR from "swr";

export const useGetForm = (name: string) => {
  const { data, error } = useSWR(`/api/form?name=${name}`);

  return {
    form: data,
    isLoading: !error && !data,
    isError: error,
  };
};
