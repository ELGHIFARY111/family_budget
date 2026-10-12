import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App.jsx";
import NotFound from "./notFound/notFound.jsx";
import Layout from "./layout/layout.jsx";
import Budget from "./budget/budget.jsx";
// const store = configureStore({
//   reducer: {},
// });

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* <Provider store={store}> */}
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={"/"} element={<App />} />
                    <Route path={"/budget"} element={<Budget />} />
                </Route>
                <Route path={"/*"} element={<NotFound />} />
            </Routes>
        </BrowserRouter>
        {/* </Provider> */}
    </StrictMode>,
);
