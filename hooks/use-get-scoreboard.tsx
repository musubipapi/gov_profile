import useSWR from "swr";

export const useGetScoreboard = () => {
  const { data, error, mutate } = useSWR(
    `/api/form?name=Scoreboard&dimension=A2:A`
  );
  return {
    data,
    mutateScoreboard: mutate,
    isLoading: !error && !data,
    isError: error,
  };
};
