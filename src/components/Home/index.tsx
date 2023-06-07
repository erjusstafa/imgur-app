import style from "./index.module.css";
import Header from "../Header";
import MainView from "../MainView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "../DetailPage";
import Image from "../UI/Image";
import imgur from "../../assets/imgur_bg.png";
function Home() {
  return (
    <>
      <Header />
      <div className={style.imgContainer}>
        <Image
          src={imgur}
          alt="img"
          width={"100%"}
          height={"auto"}
          className="logoIcon"
        />
      </div>
      <div className={style.container}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainView />} />
          </Routes>
          <Routes>
            <Route path="/:id" element={<DetailPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default Home;
