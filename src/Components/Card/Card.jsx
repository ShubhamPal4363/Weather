import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import wind from "../../assets/Image/wind.svg";
import humidity from "../../assets/Image/humidity.svg";
import pressure from "../../assets/Image/pressure.svg";
import feels from "../../assets/Image/feels.svg";
import visible from "../../assets/Image/visible.png";
import heat from "../../assets/Image/he.png";
import Sunny from "../../assets/Image/sunny.png";
import Overcast from "../../assets/Image/overcast.png";
import Mist from "../../assets/Image/mist.png";
import Partly_Cloud from "../../assets/Image/partly.png";
import Cloudy from "../../assets/Image/cloudy.png";

function Card() {
  const { name } = useParams();
  //   console.log(name);

  const [Cvalue, setCvalue] = useState({});
  const [Fvalue, setFvalue] = useState([]);

  useEffect(() => {
    const valueCountry = async () => {
      try {
        const val = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=fd357a9216c745dba4361315240511&q=${name}`
        );

        setCvalue(val.data);

        const fval = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=fd357a9216c745dba4361315240511&q=${name}&days=5`
        );

        setFvalue(fval.data.forecast.forecastday);
        console.log(fval.data.forecast.forecastday);
      } catch (err) {
        console.log(err.message);
      }
    };

    valueCountry();
  }, [name]);

  if (!Cvalue.location || !Cvalue.current) {
    return <div>Loading...</div>;
  }

  const getBackgroundImage = () => {
    const condition = Cvalue.current.condition.text.toLowerCase();
    if (condition.includes("sunny")) return Sunny;
    if (condition.includes("overcast")) return Overcast;
    if (condition.includes("cloudy")) return Cloudy;
    if (condition.includes("mist")) return Mist;
    if (condition.includes("partly cloudy")) return Partly_Cloud;
    return Sunny;
  };

  const backgroundImage = {
    backgroundImage: `url(${getBackgroundImage()})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    color: "white",
  };

  const localDateTime = new Date(Cvalue.location.localtime);
  const formattedLocalTime = localDateTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={backgroundImage}
      >
        <h1 className="text-4xl font-semibold py-5 text-center">
          Weather Details
        </h1>

        <div className="flex flex-col bg-white rounded p-8 w-full max-w-xs shadow-lg ring-8 ring-white ring-opacity-40">
          <div className="font-bold text-xl text-black">
            {Cvalue.location.name}
          </div>
          <div className="text-sm text-gray-500">{formattedLocalTime}</div>
          <div className="mt-6 self-center inline-flex items-center justify-center w-36 h-36">
            <img
              src={Cvalue.current.condition.icon}
              alt="weatherIcon"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-row items-center justify-center mt-6">
            <div className="font-medium text-6xl text-black">
              {Cvalue.current.temp_c}°
            </div>
            <div className="flex flex-col items-center ml-6">
              <div>
                <h1 className="text-2xl text-gray-400 font-semibold text-nowrap">
                  {Cvalue.current.condition.text}
                </h1>
              </div>
              <div className="mt-1">
                <span className="text-sm">
                  <i className="far fa-long-arrow-up"></i>
                </span>
                <span className="text-sm font-light text-gray-500 flex gap-4 mt-4">
                  <img src={feels} alt="feelIcon" className="w-4 h-4" />
                  <h2>{Cvalue.current.feelslike_c}°C</h2>
                </span>
              </div>
              <div>
                <span className="text-sm">
                  <i className="far fa-long-arrow-down"></i>
                </span>
                <span className="text-sm font-light text-gray-500 flex gap-4 mt-4">
                  <img src={heat} alt="heatIcon" className="w-5 h-5" />
                  <h2>{Cvalue.current.heatindex_c}°C</h2>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between mt-6 gap-4">
            <div className="flex items-center gap-2">
              <div>
                <img src={wind} alt="windIcon" />
              </div>
              <div>
                <div className="font-medium text-lg text-black">Wind</div>
                <div className="text-sm text-gray-500">
                  {Cvalue.current.wind_kph} k/h
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <img src={pressure} alt="pressureIcon" />
              </div>
              <div>
                <div className="font-medium text-lg text-black">Pressure</div>
                <div className="text-sm text-gray-500">
                  {Cvalue.current.pressure_mb} mb
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <img src={visible} alt="visibilityIcon" />
              </div>
              <div>
                <div className="font-medium text-lg text-black">Visibility</div>
                <div className="text-sm text-gray-500">
                  {Cvalue.current.vis_km} km
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <img src={humidity} alt="humidityIcon" />
              </div>
              <div>
                <div className="font-medium text-lg text-black">Humidity</div>
                <div className="text-sm text-gray-500">
                  {Cvalue.current.humidity} %
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40 mb-14">
          {Fvalue.map((fele) => (
            <div
              className="flex justify-between items-center"
              key={Fvalue.date_epoch}
            >
              <span className="font-semibold text-lg w-1/4 text-black">
              {new Date(fele.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </span>
              <div className="flex items-center justify-end w-1/4 pr-10 gap-3">
                <span className="font-semibold text-black">{fele.day.avghumidity} %</span>
                <img src={humidity} alt="weather-icon" className="w-7 h-7" />
              </div>
              <img src={fele.day.condition.icon} alt="weather-icon" className="w-9 h-9" />
              <span className="font-semibold text-lg w-1/4 text-right text-black">
              {fele.day.avgtemp_c} °C / {fele.day.avgtemp_f} °F
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Card;
