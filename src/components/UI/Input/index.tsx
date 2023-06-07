import { InputType } from "../../../types";
import style from "./index.module.css";
function Input(props: InputType) {
  const {valueInput,onChangeValue} = props
  return (
    <input
      value={valueInput}
      onChange={onChangeValue}
      className={style.inputContainer}
      placeholder="Images , #tags, @users oh my!"
    />
  );
}

export default Input;
