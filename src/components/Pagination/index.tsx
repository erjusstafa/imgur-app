import { useState } from "react";
import { PaginationProps } from "../../types";
import style from "./index.module.css";

function Pagination(props: PaginationProps) {

  //states
  const { currentPage, pages, setcurrentPage } = props;
  const [pageNumberLimit, setpageNumberLimit] = useState<number>(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState<number>(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState<number>(0);
  const [activeItem, setActiveItem] = useState<number>(0);


  //render
  const renderPageNumbers = pages.map((number: any) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={(e) => handleClick(e, number)}
          className={`item ${number === activeItem ? "active" : ""}`}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  //next Button
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  //prev Button
  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  //decrement
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  //increment
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li className={style.NumberList} onClick={handlePrevbtn}>
        {" "}
        &hellip;{" "}
      </li>
    );
  }
  
  //active link
  const handleClick = (event: any, itemId: number) => {
    setcurrentPage(Number(event.target.id));
    setActiveItem(itemId);
  };

  return (
    <div className={style.WrappPagination}>
      <ul className={style.pageNumbers}>
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
