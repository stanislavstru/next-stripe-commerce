import { toast } from "react-toastify";
import classNames from "classnames";

type QuantityInputProps = {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  name?: string;
  disabled?: boolean;
};

const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  onChange,
  min = 1,
  max = 5,
  name,
  disabled,
}) => {
  return (
    <div
      className={classNames(
        "wco-flex",
        disabled && "wco-opacity-30 wco-cursor-not-allowed"
      )}
    >
      <button
        type="button"
        className="wco-min-h-3 wco-min-w-5 wco-border wco-border-dark wco-rounded hover:wco-bg-gray-200"
        onClick={() => {
          if (value > min && !disabled) onChange(value - 1);
          else toast.error(`Minimum quantity is ${min}`);
        }}
        disabled={disabled}
      >
        -
      </button>
      <input
        name={name}
        type="number"
        className="wco-w-9 wco-text-center"
        value={value}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value >= min && value <= max) onChange(value);
        }}
        min={min}
        max={max}
        disabled={disabled}
      />
      <button
        type="button"
        className="wco-min-h-3 wco-min-w-5 wco-border wco-border-dark wco-rounded hover:wco-bg-gray-200"
        onClick={() => {
          if (value < max && !disabled) onChange(value + 1);
          else toast.error(`Maximum quantity is ${max}`);
        }}
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
