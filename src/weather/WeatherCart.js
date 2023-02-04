import React, { useEffect, useState, useMemo } from "react";
import sunset from "../png/sunsetnew.png";
import sunrise from "../png/sunrise.png";
import cities from "./Cities.json";
import { fetchweatherdata } from "../Slices/WeatherSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../Slices/WeatherSlice";
import Loading from "react-loading";

const WeatherCart = () => {
  const [weatheData, setweatheData] = useState([]);
  const [citiesData, setCitiesData] = useState();
  const [Lat, setLat] = useState();
  const [Lon, setLon] = useState();
  const dispatch = useDispatch();
  const [LatandLon, setLatandLon] = useState([
    { lat: 24.833333, lon: 87.8 },
    { lat: 20.9, lon: 74.783333 },
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
        // feels_like:weatherstoredata.main.feels_like,
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
    dispatch(fetchweatherdata(obj));
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



//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (index === LatandLon.length) {
//         index = 0;
//       }
//       const { lat, lon } = LatandLon[index];
//       dispatch(fetchweatherdata(LatandLon[index]))
//           index++;
      
//     }, 3000);
//     return () => clearInterval(intervalId);
//   }, [LatandLon]);


useEffect(() => {
    const intervalId = setInterval(() => {
        setweatheData([])
      LatandLon.forEach(({ lat, lon }) => {
        const obj ={lat:lat,lon:lon}
        dispatch(fetchweatherdata(obj))
      });
    }, 10000);
    // setweatheData([])
    // return () => clearInterval(intervalId);
}, [LatandLon]);















  if (status === STATUSES.LOADING) {
    return (
      <div className="flex justify-center">
        {" "}
        <Loading type="bubbles" color="#ff0000" height={667} width={375} />
      </div>
    );
  }
  if (status === STATUSES.ERROR) {
    return <h2>something went wrong..!</h2>;
  }
  console.log(weatheData);
  return (
    <div className=" text-gray-500">
      <header className="text-gray-600 body-font bg-violet-500 mb-2">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <select onChange={SelectedCity}>
            <option value="">Select City</option>
            {citiesData &&
              citiesData.map((city) => {
                return <option value={city.name}>{city.name}</option>;
              })}
          </select>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <button className="mr-5 hover:text-gray-900" onClick={addCity}>
              First Link
            </button>
            <a className="mr-5 hover:text-gray-900">Second Link</a>
          </nav>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-6 p-3  bg-white">
        {weatheData &&
          weatheData.map((item) => {
            return (
              <div className="w-full border bg-gray-200 p-5 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-gray-500">{item.name}</p>
                  <i className="far fa-trash-alt add-btn text-red-600"></i>
                </div>
                <hr className=" border-1 mt-2 border-yellow-400" />
                <div className="w-full mt-2 flex justify-end">
                  <img src={sunset} alt="" className="w-10 h-10" />
                </div>
                <div className="rounded overflow-hidden  flex justify-center flex-col items-center">
                  <span alt="ecommerce" className="text-yellow-600 text-9xl">
                    {item.temp.toFixed(0)}
                    <sup>'</sup>C
                  </span>
                  <p className="font-bold text-gray-500">{item.feels_like}</p>
                </div>
                <div className="flex justify-around mt-3 w-full">
                  <div className="flex flex-col items-center ">
                    <img src={sunrise} alt="" className="w-12 h-15" />
                    <span className="font-bold text-gray-500">
                      {new Date(item.sunrise * 1000).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src={sunset} alt="" className="w-12 h-12" />
                    <span className="font-bold text-gray-500">
                      {convertTime(item.sunset)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default WeatherCart;
