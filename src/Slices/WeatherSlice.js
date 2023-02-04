import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const WeatherStore = createSlice({
  name: "weatherstore",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchweatherdata.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchweatherdata.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchweatherdata.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchweatherdata = createAsyncThunk(
  "weatherdata/fetch",
  async (lat,lon) => {

    const res = await fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`, {
      method:"GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const getres = await res.json();
    console.log(getres, ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
    return getres;
  }
);  

export const {} = WeatherStore.actions;
export default WeatherStore.reducer;

