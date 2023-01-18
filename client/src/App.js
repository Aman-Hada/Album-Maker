import React, {useState, useEffect} from 'react'
import { getImages,getSearch } from './api';
import './App.css'
const App = () => {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue]= useState('');
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
  const loadSearchHandler=async(event)=>{
    event.preventDefault();
    const responseJson=await getSearch(searchValue,nextCursor);
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
    
  }
  
  return (<>
    <form className='form' onSubmit={loadSearchHandler}>
      <input value={searchValue} onChange={(event)=> setSearchValue(event.target.value)} required='required' placeholder='enter a search value...' ></input>
      <button type='submit'>search</button>
      <button type='reset'>clear</button>
    </form>
    
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