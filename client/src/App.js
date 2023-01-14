import React, {useState, useEffect} from 'react'
import { getImages } from './api';
import './App.css'
const App = () => {
  const [imageList, setImageList] = useState([])
  useEffect(()=>{
    const fetchdata = async()=>{
      const responseJson=await getImages();
      setImageList(responseJson.resources);
    }
    fetchdata();
  }, []);
  
  return (
    <div className='image-grid'>{
      imageList.map((image)=>(<img src={image.url} alt={image.public_id}></img>))
    }</div>
  );
};
export default App;