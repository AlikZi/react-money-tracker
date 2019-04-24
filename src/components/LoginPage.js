import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = (props) => (
    <div className='box-layout'>
        <div className="box-layout__box">
            <h1 className="box-layout__box-title">Money Tracker</h1>
            <p className="box-layout__box-text">It's time to get your expenses under control.</p>
            <button className="btn btn--login" onClick={props.startLogin}>Login with Google</button>
        </div>
    </div> 
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage);