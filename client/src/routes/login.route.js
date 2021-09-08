import apiV1Request from './api.v1.route'


export const loginRoute = async (data) => 
    await apiV1Request.post("/user/login",
        data
    ).then((response) => {
            // console.log(response.data);
            return response.data;
        }, (error) => {
            // console.log(error);
            return false;
    })




    // setxAccessor((d)=>{
    //     return new Date(d.date);
    // })

    // const [xAccessor, setxAccessor] = useState((d) => {
    //     return d.date;
    // });