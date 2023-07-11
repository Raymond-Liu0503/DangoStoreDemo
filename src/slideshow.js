import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const slidePics = ["starwberrydango.jpg /strawberryPage", "orangedango.jpg /orangePage", "shibaDango.jpg /shibaPage"];
const dotColors = [];
const delay = 3000;

function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function IDsource(source, type){
    const myArray = source.split(" ");
    if(type == '1'){
      return myArray[0];
    }else{
      return myArray[1];
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slidePics.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="featured">
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {slidePics.map((source, index) => (
            <div
              className="slide"
              key={index}
            > <motion.div whileHover={{ scale:0.95}}>
                <Link to={IDsource(source, 2)}>
                  <img src={IDsource(source, 1)} className="slide-img" ></img>
                </Link>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="slideshowDots">
          {slidePics.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slideshow;