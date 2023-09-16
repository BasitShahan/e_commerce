


  {/* password #.6F?H5sR3*-+#3

*/}
                
                
import React from 'react';
import './cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, remove, removeAll, decrement } from '../../redux/Slice';
import { loadStripe } from '@stripe/stripe-js';
import data from '../data/Data';
import axios from 'axios'
export default function Cart() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);

  const handleDelete = (id) => {
    dispatch(remove(id));
  };

  const handleIncrement = (data) => {
    dispatch(addToCart(data));
  }

  const handleDecrement = (data) => {
    dispatch(decrement(data));
  }

  const makepayment = async () => {
    const stripe = await loadStripe('pk_test_51NjEEMKXgDwKPURwLv23NUBpedSauUq8Ysr0iXGt6OFpjaNOtvrknvZgVqMbHMc0a4iXMuAk0bMaw3vx14Z3mo0n00dTWcMqd9'); 
    
    // const body = {
    //   product: state.cart
    // }
    // const headers = {
    //   "Content-Type": "application/json"
    // }
    // const response = await fetch('/api/create-checkout-session', {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify(body)
    // });
    // const session = await response.json(); // Use 'json()' instead of 'JSON()'
   const  sendData=await axios.post('/api/create-checkout-session')
   console.log(sendData)
    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })
    if (result.error) {
      console.log(result.error)
    }
  }

  return (
    <div className='maindiv'>
      <div className='box' style={{ backgroundColor: '#F8F8F8', boxShadow: '-1px 1px 6px -1px rgba(0, 0, 0, 0.75)' }}>
        <div className='header' style={{ backgroundColor: '#ECECEC', color: '#333333', fontWeight: 500 }}>
          <div style={{ marginTop: '12px', fontWeight: '700', marginLeft: '5rem', fontFamily: 'unset' }}>
            {state.cart.length === 0 ? 'Cart is Empty' : `Cart Calculations: (${state.cart.length})`}
          </div>
          <div style={{ marginTop: '5px', marginRight: '4rem' }}>
            <button style={{ fontWeight: '500' }} onClick={() => { dispatch(removeAll()) }} className='btn btn-danger w-30'>
              Empty Cart
              <span style={{ marginLeft: '10px' }}>
                <i className='fa-solid fa-trash' style={{ color: '#555555' }}></i>
              </span>
            </button>
          </div>
        </div>
        {state.cart.length === 0 ? (
          <div className='empty-cart-message'>Your cart is empty.</div>
        ) : (
          <div className='cart-table-container'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>Action</th>
                  <th scope='col'>Product</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Qty</th>
                  <th scope='col'>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {state.cart.map((value, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>
                        <button className='btn btn-danger' onClick={() => handleDelete(value.id)}>Delete</button>
                      </td>
                      <td>
                        <img src={value.image} width='100px' height='70px' alt='' />
                      </td>
                      <td>{value.price}</td>
                      <td>
                        <div style={{ display: 'flex' }}>
                          <div>
                            <button onClick={() => handleDecrement(value)} className='btn btn-outline' style={{ backgroundColor: '#91C8E4' }}>
                              -
                            </button>
                          </div>
                          <span style={{ marginLeft: '1rem' }}>{value.qnty}</span>
                          <div>
                            <button onClick={() => handleIncrement(value)} className='btn btn-outline' style={{ backgroundColor: '#91C8E4', marginLeft: '1rem' }}>
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{value.qnty * value.price}</td>
                    </tr>
                    <tr>
                      <td>
                        <button onClick={makepayment} type='submit' className='btn btn-outline-success' style={{ fontWeight: '600' }}>CheckOut</button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

  













