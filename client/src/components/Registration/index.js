import React, {useState} from 'react'

import RegistrationMessage from '../RegistrationMessage';
import RegistrationHeader from '../headers/RegistrationHeader'
import Login from '../Forms/Login'
import SignUp from '../Forms/SignUp'
import './style.css'


function Registration() {
    
    const [formType, setFormType] = useState(true);


    const changeForm = () => {
        setFormType(!formType);
    }
    
    return (
        <div className="registration_main">
            <RegistrationHeader />
            <div className="registration_body">
                <div className="registration_message">
                    <RegistrationMessage />
                </div>

                <div className="registration_form">
                    {formType ? <Login changeForm={changeForm} /> 
                            : <SignUp changeForm={changeForm} />
                    }
                </div>
            </div>

        </div>
    )
}

export default Registration
