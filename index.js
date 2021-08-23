const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res)=>{
    res.json({
        message:"hey welcome to the api service",
    })
})

app.post('/api/posts', verifyToken, (req, res)=>{
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if(err){
            res.sendStatus(403);   // forbidden
        } else {
            res.json({
                message: 'Posts created...',
                authData,
            });
        }
    });
  
});

// it gives login screen
app.post('/api/login', (req, res) => {
    const user = {
        id:1,
        username:"Jasveer",
        email:'talkjasveer@gmail.com'
    }
    jwt.sign({user:user}, 'secretKey', (err, token)=>{
        res.json({
            token,
        });
    });
});

function verifyToken(req, res, next){
    const bearerHeader = req.header['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next()
    }else{
        res.sendStatus(403)  // forbidden
    }
}

app.listen(8081, (req,res)=>{
    console.log('server started on port 8081')
})