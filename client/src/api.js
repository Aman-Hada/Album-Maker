const API_URL=process.env.REACT_APP_API_URL;
console.log(API_URL);

export const getImages = async()=>{
    const response = await fetch(`${API_URL}/photos`)
    console.log("here");
    console.log(response);
    const responseJson= await response.json();
    console.log(responseJson);
    return responseJson;
};
