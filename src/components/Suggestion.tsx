import { Options } from "../types/types"

interface Props {
  options: Options[]
  onSelect: (option: Options) => void;
} 

const Suggestion = ({ options, onSelect }: Props) => (
  <ul className="bg-white ml-1 rounded-b-md absolute top-10">
    {options.map((option, indx) => (
      <li key={option.name + "-" + indx}>
        <button
          className="text-left w-full text-sm hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
          onClick={() => onSelect(option)}
        >
          {option.name}, {option.country}
        </button>
      </li>
    ))}
  </ul>
);

export default Suggestion