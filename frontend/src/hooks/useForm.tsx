import { ChangeEvent, useState } from "react";

export const useForm =<T extends Object> ( initialState: T ) => {
    const [values, setValues] = useState( initialState )

    const reset = () => {
        setValues(initialState)
    }

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setValues({
            ...values,
            [name]: value
        })
    }
    return {
        values, 
        handleChange, 
        reset
    }
}