import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import './App.css'


const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.02];
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function App() {
  const CalculateTimeLeft = () => {
    let year = 1 + new Date().getFullYear();
    const difference = +new Date(`10/01/${year}`) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = useState(CalculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(CalculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }));
  return (
    <section>
      <animated.ul
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.to(trans) }}
      >
        <li className='countdown-element'>
          <h4 className='number'>{JSON.stringify(timeLeft.days)}</h4>
          <h4 className='title'>Days</h4>
        </li>
        <li><h1 className='delimiters'>:</h1></li>
        <li className='countdown-element'>
          <h4 className='number'>{JSON.stringify(timeLeft.hours)}</h4>
          <h4 className='title'>Hours</h4>
        </li>
        <li><h1 className='delimiters'>:</h1></li>
        <li className='countdown-element'>
          <h4 className='number'>{JSON.stringify(timeLeft.minutes)}</h4>
          <h4 className='title'>Minutes</h4>
        </li>
        <li><h1 className='delimiters'>:</h1></li>
        <li className='countdown-element'>
          <h4 className='number'>{JSON.stringify(timeLeft.seconds)}</h4>
          <h4 className='title'>Seconds</h4>
        </li>
      </animated.ul>
      <div className='footer'>Created by Utkarsh Pancholi</div>
    </section>
  )
}

export default App

/*
Store the element in el
let el = document.getElementById('tilt')

Get the height and width of the element
const height = el.clientHeight
const width = el.clientWidth

/*
  * Add a listener for mousemove event
  * Which will trigger function 'handleMove'
  * On mousemove
 
el.addEventListener('mousemove', handleMove)

Define function a
function handleMove(e) {
  /*
    * Get position of mouse cursor
    * With respect to the element
    * On mouseover
   
  Store the x position
  const xVal = e.layerX
  Store the y position
  const yVal = e.layerY
  
  /*
    * Calculate rotation valuee along the Y-axis
    * Here the multiplier 20 is to
    * Control the rotation
    * You can change the value and see the results
   
  const yRotation = 20 * ((xVal - width / 2) / width)
  
  Calculate the rotation along the X-axis
  const xRotation = -20 * ((yVal - height / 2) / height)
  
  Generate string for CSS transform property
  const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
  
  Apply the calculated transformation
  el.style.transform = string
}

Add listener for mouseout event, remove the rotation
el.addEventListener('mouseout', function() {
  el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
})

Add listener for mousedown event, to simulate click
el.addEventListener('mousedown', function() {
  el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
})

Add listener for mouseup, simulate release of mouse click
el.addEventListener('mouseup', function() {
  el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
})
*/