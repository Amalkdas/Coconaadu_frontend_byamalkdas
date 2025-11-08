import React, { createContext, useState } from 'react'


export const profileupdatecontext = createContext()

function Profilepictureupdate({children}) {

    const [profilepicture,setprofilepicture] = useState({})

    const [googleauthusers,setgoogleauthusers] = useState({})
  return (
   <>

   <profileupdatecontext.Provider value={{profilepicture , setprofilepicture , googleauthusers,setgoogleauthusers}}>
    {children}
   </profileupdatecontext.Provider>
   
   
   
   </>
  )
}

export default Profilepictureupdate
