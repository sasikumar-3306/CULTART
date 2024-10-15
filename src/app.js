const express = require('express');

const app = express();

app.use('/arts', (req,res)=>{
    res.send('this is art overview url');
})

app.listen(3000, ()=>{
    console.log('server port 3000 now listening...')
});