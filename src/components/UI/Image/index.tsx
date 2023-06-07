import { ImageType } from "../../../types";
import style from "./index.module.css";
function Image(props: ImageType) {
  const {src, height, width, radius, type, alt, className} = props
  return (
    <img
      src={src}
      style={{
        height: height,
        width: width,
        borderRadius: radius,
      }}
      alt={alt}
      className={type === "jpeg" ? style.ImageList : style.Image}
    />
  );
}

export default Image;
