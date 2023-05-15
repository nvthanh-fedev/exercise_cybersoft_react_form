import ReactDOM from "react-dom/client";

//Cấu hình react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Cấu hình redux
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import FormRedux from "./pages/Hooks/ReduxHook/FormRedux";
import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<FormRedux />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
