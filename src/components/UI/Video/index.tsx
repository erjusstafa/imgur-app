import style from "./index.module.css";
import { VideoType } from "../../../types";
function Video({ src, width, height, className ,type}:VideoType) {
  return (
    <>
    <video
      src={src}
      width={width}
      height={height}
      className={style[className]}
    />
    <p className={style.title}>{type}</p>
    </>
  );
}

export default Video;
