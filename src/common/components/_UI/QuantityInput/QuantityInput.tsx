import { toast } from "react-toastify";

type QuantityInputProps = {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  name?: string;
};

const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  onChange,
  min = 1,
  max = 5,
  name,
}) => {
  return (
    <div className="wco-flex">
      <button
        type="button"
        className="wco-min-h-3 wco-min-w-5 wco-border wco-border-dark wco-rounded hover:wco-bg-gray-200"
        onClick={() => {
          if (value > min) onChange(value - 1);
          else toast.error(`Minimum quantity is ${min}`);
        }}
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
      />
      <button
        type="button"
        className="wco-min-h-3 wco-min-w-5 wco-border wco-border-dark wco-rounded hover:wco-bg-gray-200"
        onClick={() => {
          if (value < max) onChange(value + 1);
          else toast.error(`Maximum quantity is ${max}`);
        }}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
