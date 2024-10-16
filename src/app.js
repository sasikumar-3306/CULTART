const express = require('express');

const app = express();

app.use('/(ab)+(cd)*ef', (error, req, res, next) => {
    console.log(error,"err")
    // res.send('this is art overview url');
}, (req, res, next) => {
    res.send('2nd response');
})

app.listen(3000, ()=>{
    console.log('server port 3000 now listening...')
});