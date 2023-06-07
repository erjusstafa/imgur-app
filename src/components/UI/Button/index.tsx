import React from "react";
import { ButtonType } from "../../../types";
import style from "./index.module.css";

function Button(props: ButtonType) {
  return (
    <button
      style={{ backgroundColor: props.bgColor, color: props.color }}
      className={style.buttonContainer}
    >
      {props.text}
    </button>
  );
}

export default Button;
