const express = require('express');

const app = express();

app.use('/arts', (req, res, next) => {
    throw new Error('something went wrong!!')
})

app.use('/', (err, req, res, next) => {
    if(err){
        console.log(err,"err")
        res.status(500).send('something went wrong');
    }
    else{
        res.send('response!!')
    }
})

app.listen(3000, ()=>{
    console.log('server port 3000 now listening...')
});