import React, { useEffect, useState, useMemo } from "react";
import sunset from "../png/sunsetnew.png";
import cloudy from "../png/cloudy1.png";
// import sunset2 from "../png/sunset2.png";
import sunset2 from "../png/sunset6.jpg";
import images from "../png/images.png";
import sunrise from "../png/sunrise.png";
import sunrise3 from "../png/sunrise3.jpg";
import cities from "./Cities.json";
import { fetchweatherdata } from "../Slices/WeatherSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../Slices/WeatherSlice";
import Loading from "react-loading";
import Swal from "sweetalert2";
const WeatherCart = () => {
  const [weatheData, setweatheData] = useState([]);
  const [citiesData, setCitiesData] = useState();
  const [Lat, setLat] = useState();
  const [isData, setIsData] = useState(false);
  const [Lon, setLon] = useState();
  const dispatch = useDispatch();
  const [LatandLon, setLatandLon] = useState([
    // { lat: 24.833333, lon: 87.8 },
    // { lat: 20.9, lon: 74.783333 },
  ]);
  let index = 0;

  const { data: weatherstoredata, status } = useSelector(
    (state) => state.weatherstoredata
  );

  useEffect(() => {
    setCitiesData(cities);
  }, []);

  useEffect(() => {
    if (weatherstoredata && weatherstoredata.main) {
      const newdata = {
        name: weatherstoredata.name,
        temp: weatherstoredata.main.temp,
        feels_like: weatherstoredata.main.feels_like,
        sunrise: weatherstoredata.sys.sunrise,
        sunset: weatherstoredata.sys.sunset,
        id: weatherstoredata.id,
        icon:weatherstoredata.weather[0].icon
      };
      setweatheData([...weatheData, newdata]);
      //   setweatheData(...new Set(weatheData))
    }
  }, [weatherstoredata]);

  const addCity = () => {
    const obj = {
      lat: Lat,
      lon: Lon,
    };

    let checkDuplicateCity =LatandLon.filter((item)=>item.lat ===Lat && item.lon===Lon) 
    if (!obj.lat || obj.lat === undefined || obj.lat === null){
    console.log(obj,"ddddddddddddddddddd")
    Swal.fire('You Have Not Selected Any City')


  }else if(checkDuplicateCity.length !==0){
    Swal.fire('You Try to Add Duplicate City')
  }
  else{
    setLatandLon([...LatandLon,obj])
    dispatch(fetchweatherdata(obj));
    setLat()
    setLon()
    setIsData(true)
  }
  };

  const convertTime = (t) => {
    if (t) {
      const date = new Date(t * 1000);
      return date.toLocaleTimeString();
    }
  };

  const SelectedCity = async (e) => {
    console.log(e.target.value, "gggggggg");
    const ab = citiesData.filter((item) => {
      return item.name === e.target.value;
    });

    setLat(ab[0].lat);
    setLon(ab[0].lon);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
        setweatheData([]); // reset the weather data here
        LatandLon.forEach(({ lat, lon }) => {
          const obj ={lat:lat,lon:lon}
          dispatch(fetchweatherdata(obj))
        });
    }, 10000);
    return () => clearInterval(intervalId);
  }, [LatandLon]);

  const DeleteCity = (id) => {
    let filt = weatheData.filter((item) => {
      return item.id !== id;
    });
    setweatheData(filt);
    if(filt.length <=0){
      setIsData(false)
    }
  };
  const RomveAllCity = () => {
  setweatheData([])
  setIsData(false)
  };

  if (status === STATUSES.LOADING) {
    return (
      <div className="flex justify-center">
        <Loading type="bubbles" color="#ff0000" height={667} width={375} />
      </div>
    );
  }
  if (status === STATUSES.ERROR) {
    return <h2>something went wrong..!</h2>;
  }
  console.log(weatheData);
  return (
    <div className=" text-gray-500 bg-gray-200 min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <header className="text-gray-600 body-font bg-violet-600 ">
        <div className="container  flex flex-wrap p-2 flex-row items-center">
          <div className="flex mx-2 md:mx-5 items-center md:px-4  bg-slate-200 rounded-md">
            <span className="mx-2 p-2  md:text-2xl font-semibold">
              Weather-App
            </span>
            <img src={images} className="w-9 h-9" alt="" />
          </div>
          <select onChange={SelectedCity} className="w-36 h-10 md:w-56 md:h-10 rounded-lg ">
            <option value="">Select City</option>
            {citiesData &&
              citiesData.map((city) => {
                return <option value={city.name}>{city.name}</option>;
              })}
          </select>
          <button
            className="mr-5 lg:ml-5 hover:text-gray-900 pr-4 px-2 md:px-4 mx-2 h-10 text-center text-white bg-pink-500 rounded-md shadow hover:bg-pink-700"
            onClick={addCity}
          >
            Add City
          </button>
          <button
            className="mr-5 lg:ml-5 hover:text-gray-900 px-2 md:px-4  h-10 text-center text-white bg-pink-500 rounded-md shadow hover:bg-pink-700"
            onClick={RomveAllCity}
          >
            Clear All
          </button>
        </div>
      </header>
      {/* <hr className="text-yellow-400 border-2 " /> */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 2xl:grid-cols-4  lg:grid-cols-3 lg:gap-10 p-3  text-regal-text w-full items-center justify-center">
       {isData ? ( weatheData &&
          weatheData.map((item) => {
            return (
              <div className="container mx-auto md:w-4/6 w-3/6 border border-black  p-5 rounded-lg h-[380px] bg-regal-white1 shadow-2xl shadow-black">
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-gray-500">{item.name}</p>
                  <i
                    className="far fa-trash-alt add-btn text-red-600 text-2xl"
                    onClick={() => {
                      DeleteCity(item.id);
                    }}
                  ></i>
                </div>
                <hr className=" border-1 mt-2 border-red-600" />
                <div className="w-full mt-2 flex justify-between items-center">
                <span className="font-bold text-gray-500 text-2xl">
                      {new Date(item.sunrise * 1000).toLocaleDateString()}
                    </span>
                  <img
                    src={item.icon}
                    alt=""
                    className="w-[70px] h-[70px] rounded-md"
                  />
                </div>
                <div className="rounded overflow-hidden  flex justify-center flex-col items-center">
                  <span
                    alt="ecommerce"
                    className="text-yellow-600 text-8xl font-semibold"
                  >
                    {item.temp.toFixed(0)}
                    <sup>'</sup>C
                  </span>
                  <p className="font-bold text-gray-500">
                    Feels like:{item.feels_like}
                  </p>
                </div>
                <div className="flex justify-around mt-3 w-full">
                  <div className="flex flex-col items-center ">
                    <img
                      src={sunrise3}
                      alt=""
                      className="w-13 rounded-md h-12"
                    />
                    <span className="font-bold text-gray-500">
                      {new Date(item.sunrise * 1000).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src={sunset2}
                      alt=""
                      className="w-13 rounded-md h-12"
                    />
                    <span className="font-bold text-gray-500">
                      {convertTime(item.sunset)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })):( <div className="md:col-start-2 md:col-end-3 2xl:col-end-4 md:col-span-2 text-white font-semibold">

<div className='flex flex-col items-center h-96 justify-center gap-5'>
          <span role="img" className='text-5xl'>💻</span>
          <h2 className='text-2xl font-bold'>Missing Card items?</h2>
          <p className='text-lg'>Select City to see the items you added</p>
          <span className="w-36 px-8 py-2 text-center text-white bg-pink-500 rounded-md shadow border hover:bg-gray-800" to="">Thank You</span>
      </div>
          </div>)}
      </div>
    </div>
  );
};

export default WeatherCart;
