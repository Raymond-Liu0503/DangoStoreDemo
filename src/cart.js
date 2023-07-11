import React, {useRef, useState, useEffect, useContext} from 'react';
import './App.css';
import HeaderBar from './header';
import './ppage.css';
import './cart.css';
import ScrollToTop from './scroll-to-top';
import { ShopContext } from './shop-context';
import { Link } from "react-router-dom";

const CartItem = (props) => {
    const {DecreaseQuantity, IncreaseQuantity, calculateTotalPrice, RemoveFromCart} = useContext(ShopContext);
      
    const cartDecreaseQuantity=()=>{
        
        if(props.quantity > 1){
            DecreaseQuantity(props.id);
        }
    }

    const cartIncreaseQuantity=()=>{
        IncreaseQuantity(props.id);
    }


    return(
        <div className="cart-page-item" style={{'text-decoration': 'none'}}>
            <div>
                <img className="cart-page-item-img" src={props.img}></img>
            </div>
            <div className="cart-page-item-info">
                <Link to={props.link} style={{'color':'black'}}>
                    <h2>{props.name}</h2>
                    <h4>{props.set}</h4>
                    <p>${props.price}</p>
                </Link>
                
                
            </div>
            <div className="cart-page-item-qty">
                    <div style={{'display':'flex', 'gap':'10px','align-items':'center'}}>
                        <p>Qty:</p>
                        <button className="cart-quantity-button" onClick={() => {cartDecreaseQuantity()}}>-</button>
                        <p style={{'text-align':'center'}}>{props.quantity}</p>
                        <button className="cart-quantity-button" onClick={() => {cartIncreaseQuantity()}}>+</button>
                    </div>
                    <button className="cart-remove-button" onClick={() => {RemoveFromCart(props.id)}}>Remove</button>
            </div>
        </div>
        
    )
}


export const Cart = () => {
    
    const {cartItems} = useContext(ShopContext);
    const {TotalPrice} = useContext(ShopContext);
    const {setDeliveryState} = useContext(ShopContext);

    const [price, setPrice] = useState(TotalPrice);
    const [deliveryStyle, setDeliStyle] = useState({div1:false, div2:true});
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [disabled, setDisabled] = useState(true);

    
    function changeDeliveryFee(dprice){
        if(TotalPrice !== 0){
            setPrice(TotalPrice + dprice);
        }else{
            setPrice(0);
        }
    }
    
    function DeliSelected(divName){
        if(deliveryStyle[divName] !== true || divName === 'div1'){
            if(deliveryStyle[divName] === true || divName === 'div2'){
                handleDeliveryClick(divName);
                setDeliveryPrice(0);
                changeDeliveryFee(-10);
                setDeliStyle({div2: true});
                setDeliveryState(false);
            }else{
                setDeliStyle({div1: false, div2: false});
                handleDeliveryClick(divName);
                setDeliveryPrice(10);
                changeDeliveryFee(10);
                setDeliveryState(true);
            }
        }
    
    }

    function getCurrentDate(separator='/'){

        let newDate = new Date()
        let date = newDate.getDate()+7;
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
        }

    const handleDeliveryClick = (divName) => {
        
        setDeliStyle((prevState) => ({
          ...prevState,
          [divName]: !prevState[divName],
        }));
      };
    
    useEffect(() => {
        setPrice(TotalPrice+deliveryPrice);
        if(cartItems.length === 0){
            setDisabled(true);
        }else{
            setDisabled(false);
        }
    }, [TotalPrice, deliveryPrice]);


    return(
        <div className='cartpage'>
            <HeaderBar/>
            <h1 style={{'margin-left':'7%'}}>Cart</h1>
            <div style={{'display':'flex','flexDirection':'row', 'flexWrap':'wrap', 'justify-content':'space-between'}}>
                <div className='cart-item-list'>
                    {cartItems.map((item) => {
                        return(
                            <CartItem
                                name={item.name}
                                img={item.img}
                                price={item.price}
                                set={item.set}
                                quantity={item.quantity}
                                id={item.id}
                                link={item.link}
                            />
                        )
                    })}
                </div>
                <div style={{'width':'500px', 'min-width':'300px', 'margin-right':'3%'}}>
                    
                    <div style={{'display':'flex', 'flex-direction':'column', 'gap':'20px', 'align-items':'center'}}>
                        <div
                            className={`delivery-box ${deliveryStyle.div1 ? 'active' : ''}`}
                            onClick={() => DeliSelected('div1',10)}
                            >
                                <div>
                                    <p><b>Delivery</b></p>
                                    <p>Est. Delivery Date: {getCurrentDate()}</p>
                                </div>
                                <p>$10</p>
                        </div>
                        <div
                            className={`delivery-box ${deliveryStyle.div2 ? 'active' : ''}`}
                            onClick={() =>{DeliSelected('div2',0)}}
                            >   
                                <div>
                                    <p><b>Pick up</b></p>
                                    <p>Pick up Location: My house lol</p>
                                </div>
                                
                                <p>Free</p>
                        </div>
                    </div>
                    <div style={{'display':'flex', 'flexDirection':'column', 'alignItems':'center'}}>
                        <div className="cart-page-price">
                            <div style={{'display':'flex', 'justify-content':'space-between'}}>
                                <div>Subtotal</div>
                                <div>${TotalPrice}</div>
                            </div>
                            <div style={{'display':'flex', 'justify-content':'space-between'}}>
                                <div>Delivery Fee</div>
                                <div>${deliveryPrice}</div>
                            </div>
                            <hr></hr>
                            <div style={{'display':'flex', 'justify-content':'space-between'}}>
                                <div><b>Total</b></div>
                                <div>${price}</div>
                            </div>
                            
                        </div>
                        <div className="cart-page-checkout" style={{'display':'flex','align-items':'center','justify-content':'center','margin-bottom':'10%','width':'100%'}}>
                            <Link to="/checkout" style={{'text-decoration':'none', 'width':'100%'}}>
                                <button 
                                className={`cart-page-checkout-button ${disabled ? 'active' : ''}`} 
                                disabled={disabled}
                                onClick={() => {setDeliveryState(deliveryStyle.div1)}}
                                >Checkout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <ScrollToTop/>
        </div>
    );
}

export default Cart;