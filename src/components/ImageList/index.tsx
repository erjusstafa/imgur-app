import style from "./index.module.css";
import Image from "../UI/Image";

interface IItem {
  id: string;
  account_url: string;
  title: string;
  ups: number;
  comment_count: number;
  views: number;
}

interface IProps {
  item: IItem;
  index: number;
}

function ImageList(props: IProps) {

  const {item , index} = props
  return (
    <a
      href={`/${item.id}`}
      className={style.BoxContainer}
      key={index}
    >
      <div className={style.CardContainer}>
        {/*   {Array.isArray(props.item?.images) &&
          props.item?.images.map((element: any) => {
             if (element.type === "image/jpeg" || element.type === "image/png") {
              return ( */}
        <Image
          src={""}
          alt={item.account_url}
          width={"auto"}
          height={350}
          className="icona"
        />
        {/*  );
            } else {
              return <h1> </h1>;
            }
          })} */}

        <div className={style.BottomCard}>
          <h1 className={style.title}>{item.title}</h1>
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
