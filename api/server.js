const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {json} = require('body-parser');
const axios = require('axios');
const cloudinary = require("cloudinary");

const app = express();

app.use(cors());
app.use(json());

const {parsed: config }=dotenv.config();
cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUD_NAME,
    api_secret: config.CLOUD_NAME,
    secure: true,
});

const auth={
    username: config.API_KEY,
    password: config.API_SECRET,
}
const BASE_URL=`https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}`



app.get('/photos', async(req,res)=>{
    const response= await axios.get(BASE_URL+'/resources/image',{
        auth,
        params :{
            next_cursor: req.query.next_cursor,
        }
    });
    return res.send(response.data);
});

app.delete('/delete/:resource_type/:public_id/', async(req, res)=>{
    const timestamp = Math.round((new Date).getTime()/1000);
    const response = await axios.post(BASE_URL + `/${req.params.resource_type}/destroy`, {
        public_id : req.params.public_id,
        api_key: config.API_KEY,
        signature: cloudinary.utils.api_sign_request({
            timestamp: timestamp, public_id: req.params.public_id}, config.API_SECRET),
        timestamp: timestamp
    })
    response
    return res.json({message: "deleted"})
})

app.get('/search', async(req,res)=>{
    const response= await axios.get(BASE_URL+'/resources/search',{
        auth,
        params :{
            expression: req.query.expression,
        }
    });
    return res.send(response.data);
});

const PORT=6002;
app.listen(PORT, console.log(`server is listening on port number ${PORT}`));
