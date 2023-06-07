import { ImageType } from "../../../types";
import style from "./index.module.css";
function Image(props: ImageType) {
  return (
    <img
      src={props.src}
      style={{
        height: props.height,
        width: props.width,
        borderRadius: props.radius,
      }}
      alt={props.alt}
      className={props.type === "jpeg" ? style.ImageList : style.Image}
    />
  );
}

export default Image;
