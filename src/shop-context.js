import React, {createContext, useEffect, useState} from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [lastCartItem, setLastCartItem] = useState({'item':'Why would u refresh the page lol', 'quantity':'69'}); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    const [TotalPrice, setTotalPrice] = useState(0);
    const [deliveryState, setDeliveryState] = useState(false);
    const [error , setError] = useState(false);
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    // useEffect = () => {
    //     console.log(cartItems);
    // }

    const CartLength =  cartItems.length;

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);

    function DecreaseQuantity(item){
        for(let i = 0; i < cartItems.length; i++){
            if(cartItems[i].id === item){
                cartItems[i].quantity -= 1;
                setCartItems([...cartItems]);
                calculateTotalPrice();
                return;
            }
        }
    }

    function IncreaseQuantity(item){
        for(let i = 0; i < cartItems.length; i++){
            if(cartItems[i].id === item){
                cartItems[i].quantity += 1;
                setCartItems([...cartItems]);
                calculateTotalPrice();
                return;
            }
        }
    }

    function calculateTotalPrice(){
        let total = 0;
        for(let i = 0; i < cartItems.length; i++){
            total += cartItems[i].price * cartItems[i].quantity;
        }
        setTotalPrice(total);
    }

    const AddToCart = (item) =>{
        for(let i = 0; i < cartItems.length; i++){
            if(cartItems[i].id === item.id){
                cartItems[i].quantity += item.quantity;
                setLastCartItem(item);
                calculateTotalPrice();
                return;
            }
        }
        setCartItems([...cartItems, item]);
        setLastCartItem(item);
        calculateTotalPrice();
    }

function RemoveFromCart(item){
    for(let i = 0; i < cartItems.length; i++){
        if(cartItems[i].id === item){
            cartItems.splice(i, 1);
            setCartItems([...cartItems]);
            calculateTotalPrice();
            return;
        }
    }
}

    const contextValue = {cartItems, setCartItems, CartLength, AddToCart, lastCartItem, DecreaseQuantity, 
        IncreaseQuantity, TotalPrice, calculateTotalPrice, RemoveFromCart, setDeliveryState, 
        deliveryState, error, setError, address, setAddress, name, setName};
    
    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};