import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home' 
import Header from './components/header/Header';
import Product from './components/displayproduct/Product';
import Crousel from './components/crousel/Crousel';
import Cart from './components/cart/Cart';
import Success from './components/stipesuccess/Success';
import Fail from './components/StripeFail/Fail';
import Login from './components/login/Login';
import Signup from './components/singup/Signup';
import ForgetPassword from './components/forgetpassword/ForgetPassword';

import Reset from './components/forgetpassword/Reset';


import './components/app.css'


export default function App() {
  return (
    <div>
        <BrowserRouter>
        <Header/>
        <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/product" element={<Product />}/>
        <Route path="/crousel" element={<Crousel/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/fail" element={<Fail/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgetpassword" element={<ForgetPassword/>}/>
        <Route path='/reset-password/:id/:token'   element={<Reset/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}
