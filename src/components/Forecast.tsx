import { getSunTime } from "../helpers";
import { Forecasts } from "../types/types";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";

interface Props {
  data: Forecasts;
}

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp}
    <sup>o</sup>
  </span>
);

const Forecast = ({ data }: Props) => {
  const today = data.list[0];
  return (
    <div className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
      <div className="mx-auto w-[300px]">
        <section>
          <h2>
            {data.city.name},
            <span className="font-thin">{data.city.country}</span>
          </h2>
          <h1 className="text-3xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main} {today.weather[0].description}
          </p>
          H: <Degree temp={Math.ceil(today.main.temp_max)} /> {""}
          L: <Degree temp={Math.floor(today.main.temp_min)} />
        </section>

        <section className=" flex overflow-x-scroll mt-4 pb-2 mb-5">
          {data.list.map((el, indx) => (
            <div
              key={indx}
              className="inline-block text-center w-[50px] flex-shrink-0"
            >
              <p className=" text-sm">
                {indx === 0 ? "Now" : new Date(el.dt * 1000).getHours()}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                alt={`weather-icon-${el.weather[0].description}`}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(el.main.temp)} />
              </p>
            </div>
          ))}
        </section>

        <section className=" flex justify-center text-zinc-700 gap-5">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
            <Sunrise /> <span>{getSunTime(data.city.sunrise)}</span>
          </div>

          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
            <Sunset /> <span>{getSunTime(data.city.sunset)}</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Forecast;
