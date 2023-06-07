import { PaginationProps } from "../../types";
import style from "./index.module.css";

function Pagination(props: PaginationProps) {
  const {
    handlePrevbtn,
    handleNextbtn,
    currentPage,
    pages,
    pageDecrementBtn,
    renderPageNumbers,
    pageIncrementBtn,
  } = props;

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
