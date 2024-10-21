const isAdmin = (req, res, next) => {
    let token = 'admin1';
    let isAdmin = token === 'admin';
    if(isAdmin){
        next();
    }
    else{
        res.status(401).send('Unauthorized admin credentials given!!')
    }
}

module.exports = {isAdmin};