const axios = require("axios")

class Services{
    getUserOfInstagramPostUrl(validURL , url){
        return new Promise((resolve , reject)=>{
             if(validURL.test(url)){
                axios.get(`https://api.instagram.com/oembed?url=${url}`).then((data, body)=>{
                    resolve(data)
                }).catch((err , res)=>{
                     reject("user not found or your url incorrect , please try again")
                })
                return;
            }else{
                reject("your url is invalid , please try again")
                return;
            }
        })
    }
    getUserInfoFromAigrow(username , mediaId){
        return new Promise((resolve , reject)=>{
            axios.get(`https://v2.tagscout.com/api/bot/username/${username}`, 
            {"headers": {"Content-Type": "application/json"}}).then((res)=>{
                var data = {
                    data: res.data ,
                    mediaId
                }
                resolve(data)
            }).catch(()=>{
                reject("username not found")
            })
        })
    }
    startPODsActivity(instaId , mediaId){
        return new Promise((resolve , reject)=>{
            axios.post(`https://v2.tagscout.com/api/bot/start_pod_activity/${instaId}?media_id=${mediaId}`, 
            {"headers": {"Content-Type": "application/json"}}).then((data, body)=>{
                resolve(data)
            }).catch(()=>{
                reject("username not found")
            })
        })
      }
}
module.exports = new Services()