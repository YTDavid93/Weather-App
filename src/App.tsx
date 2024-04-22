import Forecast from "./components/Forecast";
import SearchInput from "./components/SearchInput";
import useForecast from "./hooks/useForecast";

function App() {
  const { search, options, onInputChange, onOptionSelect, onSubmit, forecast, onRemove } =
    useForecast();

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <SearchInput
          search={search}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
          onRemove={onRemove}
        />
      )}
    </main>
  );
}

export default App;
