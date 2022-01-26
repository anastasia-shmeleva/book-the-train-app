import { Fragment } from 'react';
import HeaderBooking from '../components/HeaderBooking';
import Footer from '../components/Footer';
import Filters from '../components/Filters';


export default function Booking() {
  return (
    <Fragment>
      <HeaderBooking/>
        <main className="main-booking d-flex justify-content-between">
          <aside className="side-container">
            <Filters/>
          </aside>
          <section className="trains-container"></section>          
        </main>
      <Footer/>
    </Fragment>
  )
}