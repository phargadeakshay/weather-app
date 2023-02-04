import React, { useEffect, useState } from "react";
import sunset from "../png/sunsetnew.png"
import sunrise from "../png/sunrise.png"
const WeatherCart = () => {
const [data, setdata] = useState()
const [weatheData, setweatheData] = useState([])

const getAllData = async () => {
    try {
      const res = await fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${17}&lon=${73}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const itemdata = await res.json();
    
      if(itemdata){
          setdata(itemdata);
      }
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };
    useEffect(()=>{
          getAllData()
        //   console.log(data)
    },[])
    console.log(weatheData,"aaaaaa")

    const addCity =()=>{
        getAllData()
        setweatheData([...weatheData,data])
    }

    const convertTime=(t)=> {
       
          if (t) {
            const date = new Date(item.sys.sunset * 1000);
            return date.toLocaleTimeString();
          
        };
  return (
    <div className=" text-gray-500" >
        <header className="text-gray-600 body-font bg-violet-500 mb-2">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
   <div>Logo</div>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <button className="mr-5 hover:text-gray-900" onClick={addCity}>First Link</button>
      <a className="mr-5 hover:text-gray-900">Second Link</a>
    </nav>
  </div>
</header>
        
 {weatheData && weatheData.map((item)=>{
    return(
             
        <div className="container mx-auto md:col-start-2 md:col-end-6 md:col-span-4 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-6 pb-5  ">
            <div className="w-full border bg-gray-200 p-5 rounded-lg">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-gray-500">pune</p>
                    <i
                      className="far fa-trash-alt add-btn text-red-600"
                    ></i>
                </div>
                <hr className=" border-1 mt-2 border-yellow-400"/>
                <div className="w-full mt-2 flex justify-end">
                    <img src={sunset} alt="" className="w-10 h-10" />
                </div>
              <div className="rounded overflow-hidden  flex justify-center flex-col items-center">
                <span
                  alt="ecommerce"
                  className="text-yellow-600 text-9xl"
                >27C</span>
                <p className="font-bold text-gray-500">feel like</p>
              </div>
              <div className="flex justify-around mt-3 w-full">
               <div className="flex flex-col items-center ">
                <img src={sunrise} alt="" className="w-12 h-15" />
                <span className="font-bold text-gray-500">{new Date(item.sys.sunrise * 1000).toLocaleTimeString()}</span>
               </div>
               <div className="flex flex-col items-center">
               <img src={sunset} alt="" className="w-12 h-12" />
               <span className="font-bold text-gray-500">{()=>{convertTime()}}</span>
               </div>
              </div>
            </div>
          </div>
        </div>

    )
 })

 }     
    </div>
  );
};

export default WeatherCart;
