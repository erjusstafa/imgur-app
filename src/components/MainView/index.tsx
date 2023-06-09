import { useState, useEffect } from "react";
import style from "./index.module.css";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { fetchImguApi } from "../../redux/features/slice";
import ImageList from "../ImageList";
import { ApiInterface } from "../../types";
import Pagination from "../Pagination";
import { RootState } from "../../redux/store";
import Loading from "../Loading";
import Select from "../Select/Select";
interface APIResponse {
  name: string;
  // other properties...
}
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
  const [sortOption, setSortOption] = useState<"a-z" | "id">("a-z");
  const [apiResponse, setAPIResponse] = useState<ApiInterface[]>(arrayData);
  //states for Pagination
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [itemsPerPage, setitemsPerPage] = useState<number>(5);

  const pages = [];
  for (let i = 1; i <= Math.ceil(20 / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleSortOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOption(event.target.value as "a-z" | "id");
    const sortedResponse = [...apiResponse];
    if (sortOption === "a-z") {
      sortedResponse.sort((a: any, b: any) => a.title.localeCompare(b.title));
    } else {
      sortedResponse.sort((a: any, b: any) => b.title.localeCompare(a.title));
    }
    setAPIResponse(sortedResponse);
  };

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

  return (
    <div className={style.eri}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Select
            selectedOption={selectedOption}
            setSelectedOption={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedOption(event.target.value)
            }
            selectedOptionViral={selectedOptionViral}
            setSelectedOptionViral={(
              event: React.ChangeEvent<HTMLSelectElement>
            ) => setSelectedOptionViral(event.target.value)}
            sortOption={sortOption}
            handleSortOptionChange={handleSortOptionChange}
          />

          <div className={style.Container}>
            <div className={style.mainView}>
              {Array.isArray(apiResponse) && apiResponse.length > 0 ? (
                Array.isArray(apiResponse) &&
                apiResponse
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
                <h1>Not found</h1>
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
