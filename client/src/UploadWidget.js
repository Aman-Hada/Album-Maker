import { useEffect,useRef } from 'react'
export const UploadWidget = ({imageList, setImageList}) => {
    const cloudinaryRef= useRef();
    const widgetRef= useRef();

    useEffect(()=>{
        cloudinaryRef.current=window.cloudinary;
        widgetRef.current=cloudinaryRef.current.createUploadWidget({
            cloudName: 'dgmnw0fle',
            uploadPreset: 'cn3kkv4i',
        },function(error,result){
            console.log(result);
            setImageList(imageList)
        })        
    },[]);

    var openwidget = () =>{
        widgetRef.current.open();
    }
    
    return(
        <button onClick={()=>{
            openwidget();
        }}> Upload </button>
    );  
}
