import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function Header() {
  

  const state=useSelector((state)=>state.cart)
 console.log(state)
     
    return (
    <>
   
    <nav   className=" navbar navbar-expand navbar-light bg-dark">
    <div className="container">
    
    <NavLink style={{fontWeight:"700",marginLeft:'1rem',color:'wheat'}} className="navbar-brand" to="/">Ecommerce</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">


      </ul>

      <form className="d-flex">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'0px 50px'}}>
        <div >
        <NavLink style={{margin:'0px 30px'}} className='btn btn-success' to='/signup'>signup</NavLink>
        </div>
        <div >
         <NavLink className='btn btn-primary' to='/login'>login</NavLink>
        </div>

    </div>         
       <NavLink to="/cart">
      <i style={{marginRight:"1rem",color:'wheat',marginTop:'20px',position:'absolute'}} className="fa-solid fa-cart-shopping fa-2xl " ></i>
      </NavLink>
         
         <span style={{ position:'relative',color:'#D71313',left:'2rem',marginTop:'-0.5rem'}}>{state.cart.length ? state.cart.length : 0}</span>
         
      </form>

    </div>
  </div>
</nav>
      
    </>
  )
}


