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
    }  else if (index === 1 && inputValues[1] >= values[0] && inputValues[1] <= values[1]) {
      newValues[1] = inputValues[1];
    }
    setValues(newValues);
  };

  const handleBlur = (index: number) => {
    if (index === 0) {
      saveInputValue(index);
      setShowMinInput(false);
    } else {
      saveInputValue(1);
      setShowMaxInput(false);
    }
  }

  if (!values || values.length === 0) return <p>Values not found</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="h-screen flex w-screen md:p-40 p-8">
       <div className="font-hknova w-full m-auto">
      {error && <p>Couldn&apos;t fetch data</p>}
      <Range values={values} min={min} max={max} onChange={handleRangeChange} />
      <div className="mb-6 flex justify-between pt-8">
        <div>
          {showMinInput ? (
            <input
              type="number"
              data-testid="minValueInput"
              value={inputValues ? inputValues[0] : ""}
              onChange={({ target }) =>
                handleInputChange(Number(target.value), 0)
              }
              onBlur={() => handleBlur(0)}
              className="border-2 border-black rounded-md p-1.5 ml-1.5 focus:outline-none"
            />
          ) : (
            <label
              onClick={() => setShowMinInput(!showMinInput)}
              data-testid="minValueLabel"
              className="mr-4"
            >
              €{values[0]}
            </label>
          )}
        </div>
        <div>
          {showMaxInput ? (
            <input
              type="number"
              data-testid="maxValueInput"
              value={inputValues ? inputValues[1] : ""}
              onChange={({ target }) =>
                handleInputChange(Number(target.value), 1)
              }
              onBlur={() => handleBlur(1)}
              className="border p-2 ml-2"
            />
          ) : (
            <label
              onClick={() => setShowMaxInput(!showMaxInput)}
              className="mr-4"
              data-testid="maxValueLabel"
            >
              €{values[values.length - 1]}
            </label>
          )}
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default Exercise1;