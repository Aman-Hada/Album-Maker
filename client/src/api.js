const API_URL=process.env.REACT_APP_API_URL;
export const getImages = async(nextCursor)=>{
    const params= new URLSearchParams();
    if(nextCursor){
        params.append('next_cursor',nextCursor);
    }

    const response = await fetch(`${API_URL}/photos?${params}`);
    const responseJson= await response.json();
    return responseJson;
};

export const getSearch = async(searchValue,nextCursor)=>{
    const params= new URLSearchParams();
    params.append(`expression`,searchValue);
    if(nextCursor){
        params.append(`next_cursor`,nextCursor);
    }
    const response= await fetch(`${API_URL}/search?${params}`);
    const responseJson= await response.json();
    return responseJson;
}

export const deleteImage = async(public_id, r_type)=>{
    const response = await fetch(`${API_URL}/delete/${r_type}/${public_id}`, {method: "DELETE"});
    const responseJson= await response.json();
    return responseJson;
} 