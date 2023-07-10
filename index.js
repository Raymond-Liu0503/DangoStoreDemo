import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import homePage from './home';
import StrawberryPage from './strawberryPage';
import FruitPage from './fruit';
import SpecialPage from './specialEdition';
import ClassicPage from './classic';
import CandyPage from './candy';
import Cart from './cart';
import {ShopContextProvider} from './shop-context';
import CartAddPage from './addToCartPage';
import {Checkout} from './checkout';
import {OrderPage} from './order';
import OrangePage from './orangePage';
import ShibaPage from './shibaPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/strawberryPage",
    element: <StrawberryPage/>,
  },
  {
    path: "/fruit",
    element: <FruitPage/>,
  },
  {
    path: "/specialEdition",
    element: <SpecialPage/>,
  },
  {
    path: "/classic",
    element: <ClassicPage/>,
  },
  {
    path: "/candy",
    element: <CandyPage/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
  {
    path: "/addToCartPage",
    element: <CartAddPage/>,
  },
  {
    path: "/checkout",
    element: <Checkout/>,
  },
  {
    path: "/order",
    element: <OrderPage/>,
  },
  {
    path: "/orangePage",
    element: <OrangePage/>,
  },
  {
    path: "/shibaPage",
    element: <ShibaPage/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShopContextProvider>
        <RouterProvider router={router} />
    </ShopContextProvider>
  </React.StrictMode>
);

reportWebVitals();
