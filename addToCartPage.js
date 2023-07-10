import React, {useContext} from "react"
import ReactDOM from "react-dom"
import { motion, useMotionValue, useTransform } from "framer-motion"
import "./App.css"
import "./AddCartCSS.css"
import HeaderBar from "./header"
import {Link} from "react-router-dom";
import {ShopContext} from './shop-context';

function CircularProgress({ progress }) {
  const circleLength = useTransform(progress, [0, 100], [0, 1])
  const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1])
  const circleColor = useTransform(
    progress,
    [0, 95, 100],
    ["#FFCC66", "#FFCC66", "#66BB66"]
  )

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="258"
      height="258"
      viewBox="0 0 258 258"
    >
      {/* Check mark  */}
      <motion.path
        transform="translate(60 85)"
        d="M3 50L45 92L134 3"
        fill="transparent"
        stroke="#7BB86F"
        strokeWidth={8}
        style={{ pathLength: checkmarkPathLength }}
      />
      {/* Circle */}
      <motion.path
        d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
        fill="transparent"
        strokeWidth="8"
        stroke={circleColor}
        style={{
          pathLength: circleLength
        }}
      />
    </motion.svg>
  )
}

function CartAddPage() {
  let progress = useMotionValue(90)

  const {lastCartItem} = useContext(ShopContext);

  return (
    <div className="CartAddPage-container">
        <HeaderBar/>
        <div className="CartAddPage">
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: 100 }}
                style={{ x: progress }}
                transition={{ duration: 0.5 }}
            />
            <CircularProgress progress={progress} />
            <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{type:'tween', duration: 1, delay:0.75}}>
                <h1>Added to Cart!</h1>
            </motion.div>

            <motion.div 
              animate={{opacity:1}} 
              initial={{opacity:0}} 
              transition={{type:'tween', duration: 1, delay:1}}
              className="added-item"
              >
                <img src={lastCartItem.img} style={{
                  'width':'75px',
                  'height':'75px',
                  'object-fit':'cover',
                  'margin':'10px',
                  'border-radius':'5px'
                  }}></img>
                <div className="added-item-info">
                  <h2>{lastCartItem.name}</h2>
                  <div style={{'display':'flex', 'justify-content':'space-between'}}>
                    <p>{lastCartItem.set}</p>
                    <p>Qty: {lastCartItem.quantity}</p>
                  </div>
                </div>
                
                
            </motion.div>
            <motion.div 
                animate={{opacity:1}} 
                initial={{opacity:0}} 
                transition={{type:'tween', duration: 1, delay:1.25}}
                className="CartAddPage-buttons-container"
            >   
                <Link to='/'>
                  <button className="CartAddPage-button" style={{'background-color':'rgb(6, 85, 255)','color':'white'}}>Continue Shopping</button>
                </Link>
                <Link to='/cart'>
                  <button className="CartAddPage-button">Go to Cart</button>
                </Link>
            </motion.div>
        </div>
    </div>
  )
}

export default CartAddPage;