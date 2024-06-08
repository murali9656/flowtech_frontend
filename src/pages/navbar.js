import React from 'react';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Navbar() {

  return (
    <section>
    <>
      <nav className='nav'>
   
     
        <img className="nav-img" src='https://www.flowtechfluid.in/cmoon/img/logo.png' alt='flowtech' />
          

       

      </nav>
    </>
    {/* <ul id="mobile-navbar-ul">
      <li><img className="mobile-nav-img" src='https://www.flowtechfluid.in/cmoon/img/logo.png' alt='flowtech' /></li>
      <li>Home</li>
      <li>Company</li>
      <li>Enquiry</li>
      <li>Assets</li>
      <li>Reports</li>
      <li>Logout</li>

    </ul> */}
    </section>

  );
}