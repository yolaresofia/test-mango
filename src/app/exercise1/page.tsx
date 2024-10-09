"use client";
import { useEffect, useState } from "react";
import Range from "../components/Range";
import { fetchValues } from "../hooks/useFetchValues";

const Exercise1: React.FC = () => {
  const [values, setValues] = useState<number[] | null>(null);
  const [inputValues, setInputValues] = useState<number[] | null>(null);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showMinInput, setShowMinInput] = useState(false);
  const [showMaxInput, setShowMaxInput] = useState(false);

  useEffect(() => {
    fetchValues({
      url: "https://run.mocky.io/v3/d6a96a55-9273-4009-a3d7-527e764678dc",
      setIsLoading,
      setValues,
      setMin,
      setMax,
      setError,
    });
  }, []);

  useEffect(() => {
    if (values) {
      setInputValues([...values]);
    }
  }, [values]);

  const handleRangeChange = (updatedValues: number[]) =>
    setValues(updatedValues);

  const handleInputChange = (value: number, index: number) => {
    if (!inputValues) return;
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const saveInputValue = (index: number) => {
    if (!inputValues || !values) return;
    const newValues = [...values];
    if (index === 0 && inputValues[0] <= values[1]) {
      newValues[0] = inputValues[0];
    } else if (index === 1 && inputValues[1] <= values[1]) {
      newValues[1] = inputValues[1];
    }
    setValues(newValues);
  };

  if (!values || values.length === 0) return <p>Values not found</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-40">
      <h1 className="mb-10">Exercise 1: Normal Range</h1>
      {error && <p>Couldn&apos;t fetch data</p>}
      <Range values={values} min={min} max={max} onChange={handleRangeChange} />
      <div className="mb-6 flex justify-between pt-8">
        <div>
          {showMinInput ? (
            <input
              id="minValue"
              type="number"
              value={inputValues ? inputValues[0] : ""}
              onChange={({ target }) =>
                handleInputChange(Number(target.value), 0)
              }
              onBlur={() => {
                saveInputValue(0);
                setShowMinInput(false);
              }}
              className="border p-2 ml-2"
            />
          ) : (
            <label
              onClick={() => setShowMinInput(!showMinInput)}
              className="mr-4"
              htmlFor="minValue"
            >
              €{values[0]}
            </label>
          )}
        </div>
        <div>
          {showMaxInput ? (
            <input
              type="number"
              value={inputValues ? inputValues[1] : ""}
              onChange={({ target }) =>
                handleInputChange(Number(target.value), 1)
              }
              onBlur={() => {
                saveInputValue(1);
                setShowMaxInput(!showMaxInput);
              }}
              className="border p-2 ml-2"
            />
          ) : (
            <label
              onClick={() => setShowMaxInput(!showMaxInput)}
              className="mr-4"
              htmlFor="minValue"
            >
              €{values[values.length - 1]}
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercise1;