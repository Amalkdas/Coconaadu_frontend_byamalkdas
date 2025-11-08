import React from 'react'
import Lottie from 'lottie-react'
import globe from '../images/globe.json'

function Preloader() {
  return (
    <>


  <div className='flex justify-center w-full h-screen'>


    <Lottie animationData={globe}
    loop={true} autoplay={true} style={{width:'100%',height:'100%'}}></Lottie>
  </div>
    
    
    
    </>
  )
}

export default Preloader
