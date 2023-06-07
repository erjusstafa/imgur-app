import { useState, useEffect } from "react";
import style from "./index.module.css";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { fetchImguApi } from "../../redux/features/slice";
import ImageList from "../ImageList";
import { ApiInterface, OptionValue, ViralImage, sortId } from "../../types";
import Pagination from "../Pagination";
import { RootState } from "../../redux/store";
import Loading from "../Loading";

const options: OptionValue[] = [
  { value: "top", label: "top" },
  { value: "user", label: "user" },
  { value: "hot", label: "hot" },
];

const viralOptions: ViralImage[] = [
  { value: "including", label: "including" },
  { value: "excluding", label: "excluding" },
];

const sortOptions: sortId[] = [
  { value: "a-z", label: "a-z" },
  { value: "id", label: "id" },
];

function MainView() {
  const dispatch = useReduxDispatch();
  //get data from redux-toolkit
  const arrayData = useReduxSelector((state: any) => state.imgur.dataApi.data);
  const { filterValue, loading } = useReduxSelector(
    (state: RootState) => state.imgur
  );

  //states
  const [selectedOption, setSelectedOption] = useState<string>("user");
  const [selectedOptionViral, setSelectedOptionViral] =
    useState<string>("including");
  const [selectedSort, setSelectedSort] = useState<string>("");

  //states for Pagination
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [itemsPerPage, setitemsPerPage] = useState<number>(5);

  const handleSortSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    setSelectedSort(sortOption);
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(20 / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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
      {loading ? (
        <Loading />
      ) : (
        <>
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

            <div>
              <select
                value={selectedOptionViral}
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
              &nbsp;
              <select
                value={selectedSort}
                onChange={handleSortSelect}
                className={style.selectViral}
              >
                <option value="">Sort by</option>
                {sortOptions.map((option: sortId) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
          {Array.isArray(arrayData) && arrayData.length > 5 && (
            <Pagination
              currentPage={currentPage}
              setcurrentPage={setcurrentPage}
              pages={pages}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MainView;
