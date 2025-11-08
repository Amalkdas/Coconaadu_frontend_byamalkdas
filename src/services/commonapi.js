import axios from'axios'


export const commonapi=async(httprequest,url,reqbody,reqheader)=>{
    const config = {
        method:httprequest,
        url,
        data:reqbody,
        headers:reqheader,
        validateStatus:Status=>{
            return Status < 500
        }
    }
    return await axios(config).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}