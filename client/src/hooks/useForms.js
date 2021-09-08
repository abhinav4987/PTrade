import { useState } from 'react';

export const useForm = (options) => {

    const [data, setData] = useState(options?.initialValues || {});
    const [errors, setErrors] = useState({});

    const handleChange = (key, utilFunction) => (e) => {
        const value = utilFunction ? utilFunction(e.target.value) : e.target.value;

        setData({
            ...data,
            [key]: value,
        });
    };

    const customVlaidation = ({value,key}) => {

    }

    const validate = () => {

        const validations = options?.validations;
        setErrors({});
        if(validations) {
            let valid = true;
            const newErrors = {};
            for(const key in validations) {
                const value = data[key];
                const validation = validations[key];
                if(validation?.required?.value && !value) {
                    valid = false;
                    newErrors[key] = validation?.required?.message;
                }

                const pattern = validation.pattern;
                if(pattern?.value && !RegExp(pattern.value).test(value)) {
                    valid = false;
                    newErrors[key] = pattern.message;
                }

                // const custom = validation?.custom;
                // if(custom?.isValid && !custom.isValid(value)) {
                //     valid = false;
                //     newErrors[key] = custom.message;
                // }

                // const custom = validation?.custom;
                // custom.forEach(customVlaidation(value,key));

                const lengthCheck = validation?.length;
                if(lengthCheck?.minlength >+ String(value).length || lengthCheck?.maxlength <+ String(value).length) {
                    valid = false;
                    newErrors[key] = lengthCheck.message;
                }
            }

            if(!valid) {
                setErrors(newErrors);
                return false;
            }

            return true;
        }
    }


    const handleSubmit = async (e) => {
        let isValid = validate();
        console.log(data);
        if(!isValid) {
            console.log("validated");
            return ;
        }

        setErrors({});
        if(options?.onSubmit) {
            options.onSubmit(e);
        }
    };

    return {
        data,
        handleChange,
        handleSubmit,
        errors
    };
}