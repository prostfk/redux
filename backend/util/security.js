const jwt = require('jwt-simple');

checkRole = (req, resp, role, callback) => {
    let token = req.headers['authorization'];
    let result;
    if (token === undefined) {
        result = false;
    } else {
        let data = jwt.decode(token, 'SECRET');
        console.log(data);
        if (Array.isArray(role)) {
            for (let i = 0; i < role.length; i++) {
                if (data.role === role[i]) {
                    result = true;
                    break;
                }
            }
        } else {
            result = role === data.role;
        }
    }
    result ? callback() : resp.status(403).json({error: 'not allowed'});

};

getUserInfo = (req) => {
    return jwt.decode(req.headers['authorization'],'SECRET');
};

module.exports.getUserInfo = getUserInfo;
module.exports.checkRole = checkRole;