const textFormating = (text)=>{
    if(!text)return "";
    let result = text.replace(/[\_\-]+/g," "); 
    return result[0].toUpperCase() + result.slice(1).toLowerCase() 
}

export default textFormating;