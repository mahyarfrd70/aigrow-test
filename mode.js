var mode = (function(){
    let value = ""
    return {
        get : ()=> {
            return value
        },
        set : (newValue) =>{ 
            value = newValue
        }
    }
})()
module.exports = mode