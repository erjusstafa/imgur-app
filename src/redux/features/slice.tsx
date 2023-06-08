import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "../../types";

let REACT_APP_ENDPOINT = "https://api.imgur.com/3";
export let token = "ee9a4a7b0ff010d664365ad1a418165971469719";
//fetch the API
export const fetchImguApi = createAsyncThunk(
  "imgur/fetchImguApi",
  async (item: string) => {
    return await fetch(REACT_APP_ENDPOINT + `/gallery/${item}`, {
      headers: {
        Authorization: `Bearer ${token}`, //'token'
      },
    })
      .then((res) => res.json())
      .catch((err: string) => console.log("error", err));
  }
);

const initialState: IInitialState = {
  dataApi: [],
  loading: false,
  filterValue: "",
  error: "The API isn't fetching",
};

export const dataSlice = createSlice({
  name: "imgur",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filterValue = action.payload;
    },
  },
  extraReducers: {
    [fetchImguApi.pending.toString()]: (state) => {
      console.log("Pending");
      state.loading = true;
      state.error = "";
    },
    [fetchImguApi.fulfilled.toString()]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      state.dataApi = payload;
      state.loading = false;
      state.error = "";
    },
    [fetchImguApi.rejected.toString()]: (state, { payload }) => {
      console.log("Rejecteed!");
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setFilter } = dataSlice.actions;

export default dataSlice.reducer;
