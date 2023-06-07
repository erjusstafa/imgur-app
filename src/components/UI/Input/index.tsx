import { InputType } from "../../../types";
import style from "./index.module.css";
function Input(props: InputType) {
  return (
    <input
      value={props.valueInput}
      onChange={props.onChangeValue}
      className={style.inputContainer}
      placeholder="Images , #tags, @users oh my!"
    />
  );
}

export default Input;
