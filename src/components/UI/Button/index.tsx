import { ButtonType } from "../../../types";
import style from "./index.module.css";

function Button(props: ButtonType) {
  const {bgColor, color, text} = props

  return (
    <button
      style={{ backgroundColor: bgColor, color: color }}
      className={style.buttonContainer}
    >
      {text}
    </button>
  );
}

export default Button;
