const { verifyJwt, getTokenFromHeaders } = require('../helpers/jwt');

const checkJwt = (req, res, next) => {
    // /auth/log-in
    // /auth/sign-up

    const { url: path } = req;
    console.log(path);

    const excludedPaths = ['/auth/log-in', '/auth/sign-up', '/auth/refresh'];
    const isExcluded = !!excludedPaths.find((p) => p.startsWith(path));
    if (isExcluded) return next();

    const token = getTokenFromHeaders(req.headers);
    if (!token) {
        return res.jsonUnauthorized(null, 'Invalid token!');
    }

    try {
        const decoded = verifyJwt(token);
        req.accountId = decoded.id;
        next();
    } catch(error) {
        return res.jsonUnauthorized(null, 'Invalid token!');
    }

    // console.log('decoded', new Date(decoded.exp * 1000));

};

module.exports = checkJwt;