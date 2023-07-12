import React, {useRef, useEffect} from 'react';
import './App.css';
import Slideshow from './slideshow';
import HeaderBar from './header';
import { Link } from "react-router-dom";
import { motion, useAnimation} from 'framer-motion';
import { useInView } from "react-intersection-observer";

const products = [''];

export const Product = (prods) => {
    return(
      <motion.div whileHover={{ scale:1.1}}>
        <Link to={prods.path} style={{  'text-decoration': 'none'}}>
          <div className='product-container'>
            <img className = "product-image" src={prods.image}></img>
            <h1 style={{'font-size':'24px'}}>{prods.name}</h1>
            <p>{prods.description}</p>
          </div>
        </Link>
      </motion.div>
    );
}

const Category = (cats) => {
    
    return(
      <motion.div whileHover={{ scale:1.1}}>
        <Link to={cats.path}>
          <div className='category-container'>
            <img className = "category-image" src={cats.image}></img>
          </div>
        </Link>
      </motion.div>
      );
      
    
}

function HomePage(){
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if(inView){
            controls.start('visible');
        }
    }, [controls, inView]);

    return(
    <div className='home' >
        <HeaderBar/>
        <Slideshow />
        <div className="contents">
          <div className='New'>
            <h2 style={{'text-align':'center', 'font-size':'30px', 'color':'white'}}>New Arrivals</h2>
            <div style={{'display': 'flex','justify-content':'center', 'gap':'40px','margin-left':'5%', 'margin-bottom':'20px', 'margin-right':'5%'}}>  
              <Product name={'Strawberry Dango'} description={'Tastes great'} image={'starwberrydango.jpg'} path={'/strawberryPage'}/>
              <Product name={'Orange Dango'} description={'Tastes great'} image={'orangedango.jpg'} path={'/orangePage'}/>
              <Product name={'Shiba Dango'} description={'Tastes great'} image={'shibaDango.jpg'} path={'/shibaPage'}/>
            </div>
          </div>
            <h2 style={{'text-align':'center', 'font-size':'30px', 'margin-bottom':'40px'}}>Categories</h2>
            <div className='category'>
                <Category image='Fruit.png' path='/fruit'/>
                <Category image='Candy.png' path='/candy'/>
                <Category image='Classic.png' path='/classic'/>
                <Category image='specialedition.png' path='/specialEdition'/>
            </div>
        </div>
    </div>
    );
}

export default HomePage;