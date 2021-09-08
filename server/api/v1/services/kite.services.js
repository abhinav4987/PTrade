const verifyAcccessToken = require('../utils/verifyAccessToken');

export const setKiteAccess = (request, response) => {

    let token = request;
    let accessVerify = verifyAccessToken(token);

    if(accessVerify.isValid) {
        updateKiteAccess(accessVerify.decoded, request, response);
    }
}

