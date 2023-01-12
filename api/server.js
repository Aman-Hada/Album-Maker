const express = require('express');
//const dotenv = require('dotenv');
const cors = require('cors');
const {json} = require('body-parser');
//const axios = require('axios');

const app = express();

app.use(cors());
app.use(json());

app.get('/photos', async(req,res)=>{
    return res.send({mesge : 'hello'});
});

const PORT=6000;
app.listen(PORT, console.log(`server is listening on port number ${PORT}`));
