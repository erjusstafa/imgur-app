import style from "./index.module.css";
import Image from "../UI/Image";
import { IImageList } from "../../types";

function ImageList(props: IImageList) {
  const { item, index } = props;
  return (
    <a href={`/${item.id}`} className={style.BoxContainer} key={index}>
      <div className={style.CardContainer}>
        <Image
          src={item?.images[0].link}
          alt={item.account_url}
          width={"auto"}
          height={350}
          className="icona"
        />

        <div className={style.BottomCard}>
          <h1 className={style.title}>
            {item.title.length > 40
              ? item.title.substring(0, 40) + "..."
              : item.title}
          </h1>
          <div className={style.info}>
            <span>⇧&nbsp;{item.ups} &nbsp;⇩</span>
            <span>✉&nbsp;{item.comment_count}</span>
            <span>👁&nbsp;{item.views}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default ImageList;
