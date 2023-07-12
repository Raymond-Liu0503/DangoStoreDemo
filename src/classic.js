import React, {useEffect, useRef} from 'react';
import './App.css';
import HeaderBar from './header';
import './categoryPage.css';
import {motion, useAnimation} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {Product} from './home';
import ScrollToTop from './scroll-to-top';

const ClassicDango = (prod) => {
    return(
        <div className='prod-page'>  
            <div className='fruit-img-container'>
                <img src={prod.source} className='prod-cat-img'></img>
                <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{type:'tween', duration: 1}}>
                <h1 className='cat-title'>Classic Dango</h1>
                </motion.div>
                <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{type:'tween', duration: 1, delay:0.5}}>
                <p className='cat-thumb-description'>Timeless Original Classics </p>
                </motion.div>
                <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{type:'tween', duration: 1, delay:1}}>
                <a href='#category-contents' id='shop'><p>Shop&gt;</p></a>
                </motion.div>
            </div>
        </div>
    );
}


const ClassicPage = () => {
    const [ref, isInView] = useInView();

    const mainControls = useAnimation(); 

    useEffect(() => {
        if(isInView){
            mainControls.start('visible');
        }
    }, [mainControls, isInView]);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    return(
        <div className='Category-page' >
            <HeaderBar/>
            <ClassicDango source='classic.jpg'/>
            <motion.div
                variants={{
                    hidden:{opacity:0, x:-75},
                    visible:{opacity:1, x:0},
                }}
                initial='hidden'
                animate={mainControls}
                ref={ref}
                transition={{duration:0.5, delay:0.25}}
            >
                <h2 style={{'margin-left':'5%'}}>Shop Classic Dango</h2>
            </motion.div>
            
            <motion.div
                variants={{
                    hidden:{opacity:0, y:75},
                    visible:{opacity:1, y:0},
                }}
                initial='hidden'
                animate={mainControls}
                className='category-contents'
                id='category-contents'
                ref={ref}
                transition={{duration:0.5, delay:0.25}}
            >
                <Product name={'Shiba Dango'} description={'Tastes great'} image={'shibaDango.jpg'} path={'/shibaPage'}/>
            </motion.div>
            <ScrollToTop/>
        </div>
    );
}

export default ClassicPage;