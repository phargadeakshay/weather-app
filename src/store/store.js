import { configureStore } from "@reduxjs/toolkit";
import WeatherSlice from "../Slices/WeatherSlice";

const store = configureStore({
    reducer: {
       weatherstoredata :WeatherSlice
 
    },
  });
  
  export default store;