import { configureStore } from "@reduxjs/toolkit";
import weatherdat from "../slice/TshirtListSlice";

const store = configureStore({
    reducer: {
    //   product: productReducer,
         tshirtlist:TshirtListSlice,
     //     product:ProductSlice,
         productdetails:ProductDetailsSlice,
         savetocart:SaveToCartSlice,
         cartdata:CartSlice,
         loginslicedata:LoginSlice
 
    },
  });
  
  export default store;