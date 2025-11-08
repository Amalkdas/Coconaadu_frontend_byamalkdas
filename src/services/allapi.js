import { commonapi } from "./commonapi";
import { serverurl } from "./serverurl";


//register

export const registerapi = async(reqbody)=>{
    return commonapi('POST',`${serverurl}/register`,reqbody)
}

//login

export const loginapi=async(reqbody)=>{
    return commonapi('POST',`${serverurl}/login`,reqbody)
}

//googlelogin


export const googleloginapi=async(reqbody)=>{
    return await commonapi('POST',`${serverurl}/googleloginpath`,reqbody)
}

//updateuserpasswordonly

export const updatepassworduserapi=async(reqbody,reqheader)=>{
    return await commonapi('PUT',`${serverurl}/updateuserpasswordpath`,reqbody,reqheader)
}


//update useronly

export const updateuseronlyapi = async(reqbody,reqheader)=>{
    return await commonapi('POST',`${serverurl}/updateuseronlypath`,reqbody,reqheader)
}

//addevents

export const addeventapi = (reqbody,reqheader)=>{
    return commonapi('POST',`${serverurl}/addevent`,reqbody,reqheader)
}



//getallevents


export const getalleventsapi = async(reqheader,searchkey)=>{
    return await commonapi('GET',`${serverurl}/getallevents/?search=${searchkey}`,"",reqheader)
}

//getspecificevent


export const getspecificeventapi = async(id,reqheader)=>{
    return await commonapi('GET',`${serverurl}/getspecificevent/${id}`,"",reqheader)
}

//gethomebooks

export const gethomebooksapi = async()=>{
    return await commonapi('GET',`${serverurl}/gethomebookspath`)
}

// getuserapi

export const getuserapi = async(reqheader)=>{
    return await commonapi('GET',`${serverurl}/getuserpath`,"",reqheader)
}

//getusereventstatus

export const getusereventstatusapi = async(reqheader)=>{
    return await commonapi('GET',`${serverurl}/getusereventstatuspath`,"",reqheader)
}

//updateuserand admin

export const updateuserapi=async(reqbody,reqheader)=>{
    return await commonapi('PUT',`${serverurl}/updateuserpath`,reqbody,reqheader)
}

//deletevent 

export const deleteeventapi = async(id,reqheader)=>{
    return await commonapi('DELETE',`${serverurl}/deleteeventpath/${id}`,"",reqheader)
        
    
}


//joineventapi


export const joineventapi = async(id,reqheader)=>{
    return await commonapi('PUT',`${serverurl}/joineventpath/${id}`,"",reqheader)
}


// joinedeventsapi

export const  joinedeventsapi = async(reqheader)=>{
    return await commonapi('GET',`${serverurl}/joinedpath`,"",reqheader)
}



//leave api

export const leaveapi = async(id,reqheader)=>{
    return await commonapi('PUT',`${serverurl}/leavepath/${id}`,"",reqheader)

}



// ---------------------------admin-------------------------------------------


//admingetalleventslenth


export const getalleventslengthapi = async(reqheader)=>{
    return await commonapi('GET',`${serverurl}/eventsnumber`,"",reqheader)
}

// userslength

export const getalluserslengthapi = async(reqheader)=>{
    return await commonapi('GET',`${serverurl}/usersnumber`,"",reqheader)
}


// forchat

export const getjoinchatapi =async(reqheader)=>{
    return await commonapi('GET',`${serverurl}/chatpath/${id}`,reqheader)
}


// admingetallevents

export const admingetalleventsapi = async(reqheader)=>{
    return await commonapi('GET',`${serverurl}/admingetevents`,"",reqheader)
}

//getspecificeventadmin

export const getspecificeventadminapi = async(id,reqheader)=>{
    return await commonapi('GET',`${serverurl}/getspecificeventadminpath/${id}`,"",reqheader)
}


// approveapi

export const approveapi = async(id,reqbody,reqheader)=>{
    return await commonapi('PUT',`${serverurl}/adminapprove/${id}`,reqbody,reqheader)
}

export const rejecteventapi = async(id,reqbody,reqheader)=>{
    return await commonapi('PUT',`${serverurl}/rejecteventpath/${id}`,reqbody,reqheader)
}





// admin newpasswordapi

export const newpasswordapi=async(reqbody,reqheader)=>{
    return await commonapi('PUT',`${serverurl}/newpasswordpath`,reqbody,reqheader)
}


//admingetallusers


export const getallusersapi = async(reqheader)=>{
    return await commonapi('GET',`${serverurl}/getalluserspath`,"",reqheader)
}


// admingetpending

export const getpendingeventsapi = async(reqheader)=>{
    return await commonapi('GET',`${serverurl}/pendingpath`,"",reqheader)
}


// admin get last30days

export const getlast30daysregapi = async(reqheader)=>{
    return await commonapi('GET',`${serverurl}/last30days`,"",reqheader)
}

// catgeory

export const eventcategoryapi= async(reqheader)=>{
    return await commonapi('GET',`${serverurl}/categorypath`,"",reqheader)
}


// district 

export const getbydistrictapi = async(reqheader)=>{
    return await commonapi('GET',`${serverurl}/district`,"",reqheader)
}



