export interface RangeProps {
  values: number[];
  min: number;
  max: number;
  isFixedRange?: boolean;
  onChange?: (values: number[]) => void;
}

export interface FetchValuesProps {
  setIsLoading: (loading: boolean) => void;
  url: string;
  setValues: (values: number[]) => void;
  setMin: (min: number) => void;
  setMax: (max: number) => void;
  setError: (error: string) => void;
}
