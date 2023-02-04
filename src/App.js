import logo from "./logo.svg";
import "./App.css";
import WeatherCart from "./weather/WeatherCart";
import store from "./store/store";
import { Provider } from "react-redux";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <WeatherCart />
      </Provider>
    </div>
  );
}

export default App;
