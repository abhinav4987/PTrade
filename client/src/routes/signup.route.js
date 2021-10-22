import apiV1Request from './api.v1.route'


export const signupRoute = async (data) => 
    await apiV1Request.post("/user/signUp",
        data
    ).then((response) => {
        // console.log(response);
        return true;
    }, (error) => {
        // console.log(error);
        return false;
    }); 

