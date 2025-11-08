import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import img from'../../images/reg2.png'
import find from '../../images/find.png'
import connect from '../../images/connect.png'
import go from '../../images/go.png'




function About() {
  return (
<>
<Header></Header>
<div className='grid-cols-2 flex mb-10'>
  <div className='w-[45%]   flex flex-col py-10 px-15'><p className='text-2xl flex font-semibold'>what is <span className='ml-3 text-green-500'><h1>Coconaadu</h1></span></p>
  <p className='mt-8 text-justify'>At Coconaadu we're building a community around shared experiences. We know that every city is full of people with unique passions—whether it's art, film, helping others, or just good conversation over coffee. Our platform is designed to be the bridge that brings those people together. Create an event, find an interest, or simply join a new group of friends. We're here to help you foster deeper connections and turn your everyday interests into memorable group activities. Let's connect, share, and create together.</p>

  <p className='mt-4 text-justify'>Here, you'll find everything from spontaneous coffee shop hangouts and structured sketching sessions to group movie nights and essential community service projects. Whatever your interest, your next adventure starts now. Post an event or join one today!</p>
  
  </div>
  <div className='w-[55%]  flex justify-center'>
    <img src={img} style={{height:'550px'}} alt="" />
  </div>
</div>


<Footer></Footer>

</>
  )
}

export default About
