import { useState, useEffect } from "react";
import style from "./index.module.css";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { fetchImguApi } from "../../redux/features/slice";
import ImageList from "../ImageList";
import { ApiInterface, OptionValue, ViralImage } from "../../types";
import Pagination from "../Pagination";
import { RootState } from "../../redux/store";

const options: OptionValue[] = [
  { value: "top", label: "top" },
  { value: "user", label: "user" },
  { value: "hot", label: "hot" },
];

export const viralOptions: ViralImage[] = [
  { value: "including", label: "inluding" },
  { value: "excluding", label: "excluding" },
];

function MainView() {
  const dispatch = useReduxDispatch();
  //get data from redux-toolkit
  const arrayData = useReduxSelector((state: any) => state.imgur.dataApi.data);
  const filterValue = useReduxSelector((state: any) => state.imgur.filterValue);

  //states
  const [selectedOption, setSelectedOption] = useState<string>("user");
  const [selectedOptionViral, setSelectedOptionViral] =
    useState<string>("including");

  //states for Pagination
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [itemsPerPage, setitemsPerPage] = useState<number>(5);
  const [pageNumberLimit, setpageNumberLimit] = useState<number>(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState<number>(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState<number>(0);
  const [activeItem, setActiveItem] = useState<number>(0);

  //
  const handleClick = (event: any, itemId: number) => {
    setcurrentPage(Number(event.target.id));
    setActiveItem(itemId);
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(20 / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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

  //useEffect to fetch API from Redux
  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchImguApi(selectedOption));
    };
    if (selectedOption) {
      fetchData();
    }
  }, [dispatch, selectedOption]);

  //onChange for select
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleOptionChangeViral = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOptionViral(event.target.value);
  };

  return (
    <div className={style.eri}>
      <div className={style.selectContainer}>
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className={style.selectOption}
        >
          <option value="">Select an option</option>
          {options.map((option: OptionValue) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={selectedOption}
          onChange={handleOptionChangeViral}
          className={style.selectViral}
        >
          <option value="">Select an option</option>
          {viralOptions.map((option: ViralImage) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <>
        <div className={style.Container}>
          <div className={style.mainView}>
            {Array.isArray(arrayData) && arrayData.length > 0 ? (
              Array.isArray(arrayData) &&
              arrayData
                .filter((item: ApiInterface) =>
                  item.title.toLowerCase().includes(filterValue.toLowerCase())
                )
                .filter((item: ApiInterface) => {
                  //get only viral images
                  if (selectedOptionViral === "including") {
                    return item.in_most_viral === true;
                  }
                  //get only non-viral images
                  if (selectedOptionViral === "excluding") {
                    return item.in_most_viral === false;
                  }
                })
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((item: ApiInterface, index: number) => {
                  return <ImageList item={item} index={index} />;
                })
            ) : (
              <h1>Data not found</h1>
            )}
          </div>
        </div>
        {Array.isArray(arrayData) && arrayData.length > pageNumberLimit && (
          <Pagination
            handlePrevbtn={handlePrevbtn}
            currentPage={currentPage}
            pages={pages}
            pageDecrementBtn={pageDecrementBtn}
            renderPageNumbers={renderPageNumbers}
            pageIncrementBtn={pageIncrementBtn}
            handleNextbtn={handleNextbtn}
          />
        )}
      </>
      {/*pagination */}
    </div>
  );
}

export default MainView;
