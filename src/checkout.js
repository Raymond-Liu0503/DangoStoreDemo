import React, {useRef, useState, useEffect, useContext} from 'react';
import './App.css';
import './checkout.css'
import HeaderBar from './header';
import ScrollToTop from './scroll-to-top';
import { ShopContext } from './shop-context';
import { Link, useNavigate } from "react-router-dom";




const Delivery = (props) => {
    
    const{error, setError, address, setAddress, name, setName} = useContext(ShopContext);

    return(
        <div className="delivery-option">
            <h1>Delivery Information</h1>
            <div className="delivery-option-info">
                <div>
                    <h3>Shipping Address</h3>
                    <input className='input' onChange={e => setAddress(e.target.value)}></input>
                </div>
                {error && address.length<=0?
                <label>Enter a valid address</label>:''}
                <div>
                    <h3>Name</h3>
                    <input className='input' onChange={e => setName(e.target.value)}></input>
                </div>
                {error && name.length<=0?
                <label>Enter a valid name</label>:''}
            </div>
        </div>
    )
}

const Pickup = (props) => {
    function getCurrentDate(separator='/'){

        let newDate = new Date()
        let date = newDate.getDate()+7;
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
    }

    return(
        <div className="pickup-option">
            <h1>Pickup Information</h1>
            <p>Pickup address is 299 Brambling Way. Order will be ready on {getCurrentDate()}</p>
        </div>
    )
}

const OrderItem = (props) => {
    const {DecreaseQuantity, IncreaseQuantity, calculateTotalPrice, RemoveFromCart} = useContext(ShopContext);
      
    return(
        <div className="order-page-item" style={{'text-decoration': 'none'}}>
            <div>
                <img className="order-page-item-img" src={props.img}></img>
            </div>
            <div className="order-page-item-info">
                <Link to={props.link} style={{'color':'black'}}>
                    <h3>{props.name}</h3>
                    <h5>{props.set}</h5>
                    <p>${props.price}</p>
                </Link>
            </div>
            <div className="order-page-item-qty">
                    <div style={{'display':'flex', 'gap':'10px','align-items':'center'}}>
                        <p>Qty:</p>
                        <p style={{'text-align':'center'}}>{props.quantity}</p>
            </div>
            </div>
        </div>
        
    )
}


export const Checkout = () => {
    
    const {cartItems, setCartItems} = useContext(ShopContext);
    const {TotalPrice} = useContext(ShopContext);
    const {deliveryState} = useContext(ShopContext);
    const [delivery, setDelivery] = useState(0);
    const{error, setError, address, name} = useContext(ShopContext);
    const [Billing, setBilling] = useState('');
    const navigate = useNavigate();

    
    var d;

    useEffect(() => {
        if(deliveryState){
            d = <Delivery/>;
            setDelivery(10);
        }else{
            d = <Pickup/>;
            setDelivery(0);
        }
    }, [deliveryState]);

    if(deliveryState){
        d = <Delivery/>;
    }else{
        d = <Pickup/>;
    }

    const HandleSubmit = (e) =>{
        e.preventDefault();
        if(deliveryState){
            if(address.length<=0 || name.length<=0 || Billing.length<=0 || !Billing.includes('@') || !Billing.includes('.') || cartItems.length<=0){
                setError(true);
            }else{
                navigate("/order");
                setCartItems([]);
        }
        }else{
            if(Billing.length<=0 || !Billing.includes('@') || !Billing.includes('.') || cartItems.length<=0){
                setError(true);
            }else{
                navigate("/order");
                setCartItems([]);
            }
        }
    }

    return(
        <div className='checkoutpage'>
            <HeaderBar/>
            <div className="checkoutpage-content">
                <div className="checkoutpage-content-left">
                    {d} 
                    <div style={{'margin-left':'5%'}}>
                        <h1>Billing</h1>
                        <p>E-Transfer me. I'm too lazy to set up the whole banking thing lol.</p>
                        <h4>Payment Email</h4>
                        <div>
                            <h3>Email</h3>
                            <input className='input' onChange={e => setBilling(e.target.value)}></input>
                        </div>
                        {error && (Billing.length<=0|| !Billing.includes('@') || !Billing.includes('.'))?
                        <label>Enter a valid e-transfer email</label>:''}
                    </div>
                    
                </div>
                <div className="checkoutpage-content-right">
                    <h1>Order Summary</h1>
                    <div className='order-items'>
                        {cartItems.map((item) => {
                            return(
                                <OrderItem
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
                    <div style={{'display':'flex', 'flexDirection':'column', 'alignItems':'right'}}>
                        <div className="order-page-price">
                            <div style={{'display':'flex', 'justify-content':'space-between'}}>
                                <div>Subtotal</div>
                                <div>${TotalPrice}</div>
                            </div>
                            <div style={{'display':'flex', 'justify-content':'space-between'}}>
                                <div>Delivery Fee</div>
                                <div>${delivery}</div>
                            </div>
                            <hr></hr>
                            <div style={{'display':'flex', 'justify-content':'space-between'}}>
                                <div><b>Total</b></div>
                                <div>${TotalPrice+delivery}</div>
                            </div>
                            
                        </div>
                        <div className="cart-page-checkout" style={{'display':'flex','align-items':'center','justify-content':'center','margin-bottom':'10%','width':'100%'}}>
                            <Link to="/" style={{'text-decoration':'none', 'width':'100%'}}>
                                <button 
                                className={'order-page-checkout-button'} 
                                onClick={HandleSubmit}
                                >Order</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            <ScrollToTop/>
        </div>
    );
}

export default Checkout;