import React, {useState, useEffect} from 'react'
import './style.css'
import '../forms.css'
import { useForm } from './../../../hooks/useForms';
import {signupRoute} from '../../../routes/signup.route'
const validations = {
        fullName: {
            required: {
                value: true,
                message: "This field is required"
            },
            custom : [{},{}]
        },
        userName: {
            required: {
                value: true,
                message: "This field is required"
            },
            custom : [{},{}]
        },
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
        password1: {
            required: {
                value: true,
                message: "This field is required"
            },
            pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message: "password must contain a number, lowercase, uppercase."
            },
            length:{
                minlength: 8,
                maxlength: 30,
                message: "Password must be atleast 8 characters long"
            },
        },
        password2: {
            required: {
                value: true,
                message: "This field is required"
            },
        }
}



function SignUp({changeForm}) {
    

    const [passwordMisMatch, setPasswordMisMatch] = useState(false);
    const [loginMessageSet, setLoginMessageSet] = useState(false);
    const [RetrySignUpMessage, setRetrySignUpMessage] = useState(false);

    const onSubmit = () => {
        console.log("checking passwords");
        if(Object.keys(errors).length === 0) {
            console.log(data);
            if(data.password1 !== data.password2) {
                console.log("password Mis-match");
                setPasswordMisMatch(true);
            } else {
                signUpCall();
            }
        }
        console.log(errors);
    }

    const {data,
        handleChange,
        handleSubmit,
        errors} = useForm({validations, onSubmit})
    
    
    const signUpCall = () => {
        signupRoute(data).then((result) => {
            
            console.log(result);
            if(result) {
                setLoginMessageSet(true);
                changeForm();
            } else {
                setRetrySignUpMessage(true);
            }
        })
        
    }

    const submitForm = (e) => {
        e.preventDefault();
        setPasswordMisMatch(false);
        handleSubmit();
        
    } 

    const [errorClass,setErrorClass] = useState(Object.keys(errors).length !== 0  || passwordMisMatch ? "error_notice " : "error_notice noneClass");

    useEffect(() => {
        setErrorClass( Object.keys(errors).length !== 0  || passwordMisMatch ? "error_notice " : "error_notice noneClass")
        console.log(errors,passwordMisMatch);
    }, [errors,passwordMisMatch]);

    
    
    return (
        <div className="signUp_form_main" >
            <span className="form_type">SignUp</span>
            <span className="form_desciption">Register to gain access to the platform</span>
            <form className="signUp_form_form">
                {errors && errors.name && <p className="error">{errors.name}</p>}
                <div className="form_section">
                    <label className="form_input_label">Full Name</label>
                    <input name="fullName"  className="form_input" onChange={handleChange('fullName')} required />
                </div>

                <div className="form_section">
                    <label className="form_input_label"> UserName</label>
                    <input name="userName"  className="form_input" onChange={handleChange("userName")} required />
                </div>

                <div className="form_section">
                    <label className="form_input_label">Email</label>
                    <input name="email" type="email" className="form_input" onChange={handleChange("email")} required />
                </div>

                <div className="form_section">
                    <label className="form_input_label">Password</label>
                    <input name="password1" type="password" className="form_input" onChange={handleChange("password1")} required />
                </div>

                <div className="form_section">
                    <label className="form_input_label">Re-type Password</label>
                    <input name="password2" type="password" className="form_input" onChange={handleChange("password2")} required />
                </div>
                <div className={errorClass}>Invalid inputs</div>
                <div className="button_deck">
                    <button className="registration_button login_button" onClick={ (e) => submitForm(e)} type="button">SignUp</button>
                    
                    <button className="registration_button signup_button" type="button" onClick={changeForm}>Login</button>
                </div>
                
            </form>
        </div>
    )
}

export default SignUp
