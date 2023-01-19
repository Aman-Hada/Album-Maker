import React, {useState, useEffect} from 'react'
import { getImages,getSearch } from './api';
import './App.css'
const App = () => {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue]= useState('');
  const [temp, setTempValue]=useState(0);
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
    setTempValue(1);
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
    
    
  }
  const imageRestoreHandler=async()=>{
    setSearchValue('');
    const responseJson= await getImages();
    setTempValue(0);
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
    
  }
  return (<>
    <form className='form' onSubmit={loadSearchHandler}>
      <input value={searchValue} onChange={(event)=> setSearchValue(event.target.value)} required='required' placeholder='enter a search value...' ></input>
      <button type='submit'>search</button>
      <button type='reset'>clear</button>
      {temp===1?<button type='button' onClick={imageRestoreHandler}>All Images</button>:''}
    </form>
    <div className='image-grid'>{
      imageList.map((image)=>(<img src={image.url} alt={image.public_id} key={image.public_id}></img>))
    }</div>
    <div className='footer'>
      {nextCursor && <button onClick={loadImagesHandler} >Load More Images</button>}
    </div>
    <div className='hmmm'>
      { imageList.length===0 ? <p>Sorry, no image found of that name</p>: ''}

    </div>
    </>
  );
};
export default App;