import React, {useState, useEffect} from 'react'
import { getImages } from './api';
import './App.css'
const App = () => {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  useEffect(()=>{
    
    const fetchdata = async()=>{
      const responseJson=await getImages();
      setImageList(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
    }
    fetchdata();
  }, []);

  const loadImagesHandler=async ()=>{
    const responseJson=await getImages(nextCursor);
      setImageList((currentimagelist)=>[...currentimagelist,...responseJson.resources,]);
      setNextCursor(responseJson.next_cursor);
  }
  
  return (<>
    <div className='image-grid'>{
      imageList.map((image)=>(<img src={image.url} alt={image.public_id} key={image.public_id}></img>))
    }</div>
    <div className='footer'>
      {nextCursor && <button onClick={loadImagesHandler} >Load More Images</button>}
    </div>
    </>
  );
};
export default App;