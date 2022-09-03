const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) => {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        console.log("No Authorization header...");
        req.isAuthorized = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    console.log("split token=" + token);
    if (!token || token === '') {
        console.log("No token in Authorization header...");
        req.isAuthorized = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'mysimplekey');
    } catch(err) {
        req.isAuthorized = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuthorized = false;
        return next();
    }
    req.isAuthorized = true;
    req.userId = decodedToken.userId;
    next();
}