import style from "./index.module.css";

function Loading() {
  return (
    <div className={ style.Loader }>
      <div className={style.overlay}>
        <div className={style.positioner}>
          <div className={style.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
