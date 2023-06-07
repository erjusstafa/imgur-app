import React from "react";
import style from "./index.module.css";
import Button from "../UI/Button";
import Image from "../UI/Image";
import headerIcon from "../../assets/icon.png";
import user from "../../assets/user.png";
import logo from "../../assets/logo.png";
import Input from "../UI/Input";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { setFilter } from "../../redux/features/slice";

function Header() {
  const dispatch = useReduxDispatch();
  const value = useReduxSelector((state: any) => state.imgur.filterValue);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value;
    dispatch(setFilter(filterValue));
  };
  return (
    <>
      <div className={style.containerHeader}>
        <a href="/">
          <Image
            src={logo}
            alt="img"
            width={150}
            height={50}
            className="logoIcon"
          />
        </a>
        <Input valueInput={value} onChangeValue={handleInputChange} />
        <div className={style.rightContentHeader}>
          <div className={style.rightButtonHeader}>
            <Button text="Go Add-Free" bgColor="#6432f9" color="#ffff" />
            <Image
              src={headerIcon}
              alt="img"
              width={100}
              height={35}
              className="headerIcon"
            />
          </div>
          <Image
            src={user}
            alt="img"
            width={53}
            height={53}
            radius={50}
            className="userIcon"
          />
        </div>
      </div>
      <div className={style.title}>Your cat’s favorite website.</div>
    </>
  );
}

export default Header;
