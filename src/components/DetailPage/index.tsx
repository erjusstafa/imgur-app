import axios from "axios";
import style from "./index.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { token } from "../../redux/features/slice";
import Image from "../UI/Image";
import user from "../../assets/user.png";

function DetailPage() {
  const { id } = useParams<string>();
  const [itemDetails, setItemDetails] = useState<any>({});

  useEffect(() => {
    const getRoleDetails = () => {
      axios
        .get(`https://api.imgur.com/3/gallery/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, //'token'
          },
        })
        .then((result: any) => {
          setItemDetails(result.data);
        })
        .catch((err: string) => console.log("error", err));
    };
    getRoleDetails();
  }, []);

  return (
    <div className={style.DetailPage}>
      <div key={id} className={style.DetailPageContainer}>
        <div className={style.socialdata}>
          <div className={style.votes}>
            <span>⇧</span>
            <span>{itemDetails.data && itemDetails.data.points}</span>
            <span>⇩</span>
            <span>♡</span>
          </div>
          <div className={style.comment}>
            <span>✉</span>
            <span>{itemDetails.data && itemDetails.data.comment_count}</span>
          </div>
        </div>

        <div className={style.ImageDetails}>
          <div className={style.ImageDetailsTitle}>
            <p className={style.title}>
              {itemDetails.data && itemDetails.data.title}
            </p>
            <p className={style.next}>Next &nbsp;➤</p>
          </div>
          <div className={style.headerImg}>
            <Image
              src={user}
              alt="img"
              width={26}
              height={26}
              radius={50}
              className="userIcon"
            />
            <div className={style.headerImgMore}>
              <span className={style.layout}>
                {itemDetails.data && itemDetails.data.layout}
              </span>
              <span className={style.score}>
                {itemDetails.data && itemDetails.data.score} &nbsp; Views • 12h
                • via Android
              </span>
            </div>
            <div className={style.more}>. . .</div>
          </div>
          <Image
            src={
              itemDetails.data &&
              Array.isArray(itemDetails.data.images) &&
              itemDetails.data.images[0]?.link
            }
            alt={itemDetails.data && itemDetails.data.account_url}
            width={350}
            height={350}
            className="icon-details"
            type="jpeg"
          />

          <h5 className={style.description}>
            {itemDetails.data && itemDetails.data.images[0].description}
          </h5>
        </div>

        <div className={style.others}>
          <span className={style.othersTitle}> 🔥POPULAR IN MOST VIRAL</span>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
