import RootLayout from "./Rootlayout/RootLayout";
import Product from "../pages/Product";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Product />} />
        </Route>
    )
)