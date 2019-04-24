import React from 'react';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';

export const Header = (props) => (
  <header className="header">
    <div className="container">
    <div className="header__content">
    <Link className="header__content-title" to="/dashboard">
      <h1>Money Tracker</h1>
    </Link>

    <button className="link-btn" onClick={props.startLogout}>Logout</button>
    </div>
    </div>  
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);
