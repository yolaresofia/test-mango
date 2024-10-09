import { useState, useRef, useEffect } from "react";
import { RangeProps } from "../types";
import { FC } from "react";

const Range: FC<RangeProps> = ({
  values,
  min,
  max,
  isFixedRange,
  onChange,
}) => {
  const [rangeValues, setRangeValues] = useState<number[]>([min, max]);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const rangeRef = useRef<HTMLDivElement>(null);
  const totalValues = values.length - 1;

  useEffect(() => {
    setRangeValues([values[0], values[totalValues]]);
  }, [values, totalValues]);

  const getPercentage = (value: number) => {
    if (isFixedRange) {
      const index = values.indexOf(value);
      return (index / totalValues) * 100;
    } else {
      return ((value - min) / (max - min)) * 100;
    }
  };

  const adjustToFixedValue = (clientX: number, rangeWidth: number) => {
    const rangeLeft = rangeRef.current?.getBoundingClientRect().left || 0;
    const relativePosition = (clientX - rangeLeft) / rangeWidth;
    const exactPosition = relativePosition * totalValues;
    if (exactPosition < 0) return values[0];
    if (exactPosition > totalValues) return values[totalValues];
    const closestIndex = Math.round(exactPosition);
    return values[closestIndex];
  };

  const adjustToDynamicValue = (value: number) => {
    return Math.round(Math.max(min, Math.min(value, max)));
  };

  const handleBulletDrag = (index: number) => {
    const range = rangeRef.current;
    if (!range) return;

    const rangeWidth = range.offsetWidth;
    const rangeLeft = range.getBoundingClientRect().left;

    const moveAt = (pageX: number): number => {
      const baseValue = min + ((pageX - rangeLeft) / rangeWidth) * (max - min);
      return isFixedRange
        ? adjustToFixedValue(pageX, rangeWidth)
        : adjustToDynamicValue(baseValue);
    };

    const validateValue = (value: number): number => {
      const firstValue = rangeValues[0];
      const secondValue = rangeValues[1];
      if (index === 0 && value > secondValue) return secondValue;
      if (index === 1 && value < firstValue) return firstValue;
      return value;
    };

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newValue = validateValue(moveAt(moveEvent.pageX));
      const newValues = [...rangeValues];
      newValues[index] = newValue;
      setRangeValues(newValues);

      if (onChange) {
        onChange(newValues);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      setIsGrabbing(false);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    setIsGrabbing(true);
  };

  return (
    <div className="relative h-2 bg-gray-300" ref={rangeRef}>
      {rangeValues.map((value, index) => (
        <div
          key={index}
          data-testid="range-bullet"
          className={`absolute w-4 h-4 bg-blue-600 rounded-full hover:h-5 hover:w-5 ${
            isGrabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            left: `${getPercentage(value)}%`,
            transform: "translateX(-50%)",
          }}
          onMouseDown={() => handleBulletDrag(index)}
        />
      ))}
      {isFixedRange && (
        <div className="flex justify-between mt-2 pt-6">
          {values.map((value, index) => (
            <span key={index} className="text-xs text-gray-500">
              {value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Range;
