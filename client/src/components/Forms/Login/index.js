import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import './style.css'
import '../forms.css'
import { useForm } from './../../../hooks/useForms';
import { loginRoute } from '../../../routes/login.route'
import { SetAccessToken } from './../../../utils/setAccessToken';
import { SetRefreshToken } from './../../../utils/setRefreshToken';
import { getFunds} from "../../../routes/portfolio.routes";

const validations = {

    email: {
        required: {
            value: true,
            message: "This field is required"
        },
        pattern:{
            value : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid Email"
        },
        custom : [{},{}]
    },
    password: {
        required: {
            value: true,
            message: "This field is required"
        },
        length:{
            minlength: 8,
            maxlength: 30,
            message: "Password must be atleast 8 characters long"
        },
    },
    
}



function Login({changeForm}) {

    const [retryMessage, setRetryMessage] = useState(false);
    const history = useHistory();
    const onSubmit = e => {
        e.preventDefault();
        handleSubmit();
        loginCall();
    };

    const {data,
        handleChange,
        handleSubmit,
        errors} = useForm({validations})
    
    const goToForm = (e) => {
        // e.preventDefault();
        changeForm();
    }


    const loginCall = () => {
        if(Object.keys(errors).length === 0) {
            loginRoute(data).then((result) => {
                console.log(result);
                if(result){
                    getFunds();
                    console.log("success result : ", result);
                    SetAccessToken(result.access);
                    SetRefreshToken(result.refresh);
                    
                    history.push("/dashboard");
                } else {
                    console.log("invalid creds");
                }
            })
            
            // set path to main page
        } else {
            console("invalid creds");
            setRetryMessage(true);
        }
    }

    const errorClass = errors || retryMessage ? "error_notice noneClass" : "error_notice"
        

    return (
        <div className="login_form_main">
            <span className="form_type">Login</span>
            <span className="form_desciption">Login to gain access to the platform</span>
            <form className="login_form_form">
                <div className="form_section">
                    <label className="form_input_label">Email</label>
                    <input name="email" type="email" className="form_input" onChange={handleChange('email')} required></input>
                </div>

                <div className="form_section">
                    <label className="form_input_label">Password</label>
                    <input name="password" type="password" className="form_input" onChange={handleChange('password')} required></input>
                </div>
                <div className={errorClass}>Invalid inputs</div>
                <div className="button_deck">
                    <button className="registration_button login_button"  onClick={ (e) => onSubmit(e) }>Login</button>
                    
                    <button className="registration_button signup_button" type="button" onClick={goToForm}>Signup</button>
                </div>
                
            </form>
        </div>
    )
}

export default Login


// history.push("/zerodhaLogin");
// window.open("https://kite.zerodha.com/connect/login?v=3&api_key=rughyki6lgdsqswt");
// window.close();