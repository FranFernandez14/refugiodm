import React from 'react'
import BuscadorCabaña from '../inicio/BuscadorCabaña'
import Cardlistcabaña from './home_components/CardListCabañas'
import Footer from './home_components/Footer'
import './home.css'
export default function Home() {
  return (
    <>
    <div className='home'><BuscadorCabaña/></div>
    <Cardlistcabaña></Cardlistcabaña>
    <Footer></Footer>
    </>
    
  )
}
