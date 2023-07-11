import React, {useContext} from 'react';
import './App.css';
import { Link } from "react-router-dom";
import {ShopContext} from './shop-context';

function HeaderBar(){

    const {CartLength}= useContext(ShopContext);
    
    return(
        <div className="header">
            <div className="Title">
                <Link to="/" style={{'text-decoration':'none', 'color':'Black'}}>
                    <h1>Dango!</h1>
                </Link>
            </div>
            <div style={{'position':'relative'}}>
                <Link to={'/cart'}>
                    <img src="icons8-shopping-bag-50.png" className="cart-icon"></img>
                    <p className='cart-qty-num'>{CartLength}</p>
                </Link>
            </div>
        </div>
    );          
}

export default HeaderBar;