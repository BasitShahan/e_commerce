
import React from 'react';
import data from '../data/Data';

import './product.css';
import {useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/Slice';
import { useNavigate } from 'react-router-dom';


export default function Product() {
   const navigate=useNavigate(); 
   const dispatch=useDispatch()
   const state=useSelector((state)=>state.cart)

    console.log(state.cart)

    const send = (data) => {
        console.log(data)
    dispatch(addToCart(data));
};
    return (

        <div className="container">
            <div className="row gy-4 ">
                {data.map((value, index) => (
                    <div className="col-12 col-lg-3 col-md-3" key={index}>
                        <div className="card-wrapper">
                            <div  className="card " style={{ width: '18rem',cursor:'pointer' }}>
                                <div className="image-container">
                                    <img src={value.image} alt="Hover me" />
                                </div>
                                <div className="card-body">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <h1 style={{ fontSize: "20px", fontWeight: '700' }}>Rating</h1>
                                        </div>
                                        <div>
                                            <i style={{ backgroundColor: "yellow" }} className="fa-solid fa-star"></i>
                                            <i style={{ backgroundColor: "yellow" }} className="fa-solid fa-star"></i>
                                            <i style={{ backgroundColor: "yellow" }} className="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <h1 style={{ fontSize: "20px", fontWeight: '700' }}>Price</h1>
                                        </div>
                                        <div>
                                            <p>{value.price}</p>

                                        </div>
                                    </div>
                                    <div style={{display:'flex',justifyContent:'center'}}>
                                        <div>
                                        <button type="button" onClick={() => send(value)} className="btn btn-danger">Add To Cart</button>

                                        </div>
                                    </div>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

