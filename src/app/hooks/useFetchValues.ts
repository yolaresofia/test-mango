import { FetchValuesProps } from "../types";

export const fetchValues = async ({
  setIsLoading,
  url,
  setValues,
  setMin,
  setMax,
  setError,
}: FetchValuesProps): Promise<void> => {
  try {
    setIsLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setValues(data.values);
    setMin(data.values[0]);
    setMax(data.values[data.values.length - 1]);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
      console.error(err);
    }
  } finally {
    setIsLoading(false);
  }
};
