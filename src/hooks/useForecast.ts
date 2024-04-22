import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import config from "../services/api-client";
import { BASE_API_URL } from "../services/urlConfig";
import { Forecasts, Options } from "../types/types";

const useForecast = () => {
  const [search, setSearch] = useState<string>("");
  const [city, setCity] = useState<Options | null>(null);
  const [options, setOptions] = useState<Options[]>([]);
  const [forecast, setForecast] = useState<Forecasts | null>(null);

  const getSearchOptions = (value: string) => {
    axios
      .get<Options[]>(
        `${
          config.baseURL1
        }/direct?q=${value.trim()}&limit=5&appid=${BASE_API_URL}`
      )
      .then((res) => setOptions(res.data))
      .catch((error) => console.log(error.message));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);

    if (inputValue === "") return;

    getSearchOptions(inputValue);
  };

  const getLocation = (city: Options) => {
    axios
      .get(
        `${config.baseURL2}/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${BASE_API_URL}`
      )
      .then((res) => setForecast(res.data))
      .catch((err) => console.log(err.message));
  };

  const onSubmit = () => {
    if (!city) return;
    getLocation(city);
  };

  const onOptionSelect = (option: Options) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setSearch(city.name);
      setOptions([]);
    }
  }, [city]);

  const onRemove = () => {
    setSearch("");
    setOptions([])
  }

  return {
    search,
    options,
    onInputChange,
    onSubmit,
    onOptionSelect,
    forecast,
    onRemove,
  };
};

export default useForecast;
