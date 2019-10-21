import React from 'react';
import {NavLink, Link} from 'react-router-dom';



function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Greyhound App Support
      </Link>

      <NavLink to className="navbar-brand" to="/Admin">
        <button className="btn btn-dark">
        Admin Login
        </button>
     </NavLink>
    </nav>
  );
}

export default NavBar;