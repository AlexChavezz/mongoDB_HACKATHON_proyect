import { useContext, useState } from "react";
import { ErrorContext } from "../context/ErrorContext";



interface useAlert {
    error: string | null,
    clear: () => void,
    set: (error: string) => void
}

export const useAlert = ():useAlert => {
    const { error, setError } = useContext(ErrorContext);    
    function clear()
    {
        setError(null);
    }
    
    function set(error: string)
    {
        setError(error);
    }

    return {
        error,
        clear,
        set
    }
}