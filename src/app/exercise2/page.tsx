"use client";
import { useEffect, useState } from "react";
import Range from "../components/Range";
import { fetchValues } from "../hooks/useFetchValues";

const Exercise2: React.FC = () => {
  const [values, setValues] = useState<number[]>([]);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchValues({
      setIsLoading,
      url: "https://run.mocky.io/v3/5c9c75ed-0d72-4c54-b4e7-b5f0410f9de0",
      setValues,
      setMin,
      setMax,
      setError,
    });
  }, []);

  if (!values || values.length === 0) return <p>Values not found</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="h-screen flex w-screen md:p-40 p-8">
      <div className="font-hknova w-full m-auto">
        {error && <p>Couldn&apos;t fetch data</p>}
        <Range values={values} min={min} max={max} isFixedRange={true} />
      </div>
    </div>
  );
};

export default Exercise2;
