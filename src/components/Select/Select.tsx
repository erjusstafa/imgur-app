import { ISelect, OptionValue, ViralImage, sortId } from "../../types";
import style from "./index.module.css";

const options: OptionValue[] = [
  { value: "top", label: "top" },
  { value: "user", label: "user" },
  { value: "hot", label: "hot" },
];

const viralOptions: ViralImage[] = [
  { value: "including", label: "including" },
  { value: "excluding", label: "excluding" },
];

const sortOptions: sortId[] = [
  { value: "a-z", label: "a-z" },
  { value: "id", label: "id" },
];

function Select(props: ISelect) {
  const {
    selectedOption,
    setSelectedOption,
    selectedOptionViral,
    setSelectedOptionViral,
    sortOption,
    handleSortOptionChange,
  } = props;

  return (
    <div className={style.selectContainer}>
      <select
        value={selectedOption}
        onChange={setSelectedOption}
        className={style.selectOption}
      >
        <option value="">Select an option</option>
        {options.map((option: OptionValue) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div>
        <select
          value={selectedOptionViral}
          onChange={setSelectedOptionViral}
          className={style.selectViral}
        >
          <option value="">Select an option</option>
          {viralOptions.map((option: ViralImage) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        &nbsp;
        <select
          value={sortOption}
          onChange={handleSortOptionChange}
          className={style.selectViral}
        >
          <option value="">Sort by</option>
          {sortOptions.map((option: sortId) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Select;
