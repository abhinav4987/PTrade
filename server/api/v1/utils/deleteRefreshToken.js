module.exports = function deleteRefreshToken(user, request, response) {
    var refresh = request.cookies.refreshToken
    const index = user[0].refreshTokens.indexOf(refresh);
    user[0].refreshTokens.splice(index,1);
    user[0].save();
    return response.status(200);
}