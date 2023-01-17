import React, {useState, useEffect} from 'react'
import { getImages } from './api';
import './App.css'
const App = () => {
  const [imageList, setImageList] = useState([])
  useEffect(()=>{
    
    const fetchdata = async()=>{
      //console.log('useeffect used');
      const responseJson=await getImages();
      //console.log('useeffect used');
      setImageList(responseJson.resources);
      console.log('changes made');
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