import React from 'react'
import Product from './displayproduct/Product'
import Crousel from './crousel/Crousel'
import './home.css'

export default function Home() {
  return (
    <>
        <Crousel/>
        <hr />
      <Product/>
    </>
  )
}
