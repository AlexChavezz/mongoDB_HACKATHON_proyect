import React, { useEffect, useState } from "react";
import { API } from "../../helpers/API";
import { useForm } from "../../hooks/useForm";
import { AuthFormInterface, AuthFormProps } from "../../interfaces/intefaces";
import styles from '../../styles/AuthFormComponent.module.css';
import { Button } from "./Button";
import arrow from '../../assets/arrow_right_alt_FILL0_wght400_GRAD0_opsz48.svg';
import { useAuth } from "../../hooks/useAuth";



const inititalState = {
    userName: '',
    password: '',
    confirmPassword: ''
}


export const AuthForm = ({ authState }: AuthFormProps) => {
    const [isUserAllowed, setIsUserAllowed] = useState<boolean | null>(null);
    const [isFormAllowed, setIsFormAllowed] = useState<boolean>(true);
    const { handleChange, values, reset } = useForm<AuthFormInterface>(inititalState);
    const { userName, password, confirmPassword } = values;
    useEffect(()=>{
        reset();
    },[authState])
    useEffect(() => {
        setIsFormAllowed(true);
        if (authState === "SIGN UP" && userName.trim().length >= 3) {
            console.log(userName)
            window.fetch(`${API}/users/get-user/${userName}`)
                .then(res => res.json())
                .then((user) => {
                    if(user.userName)
                    {
                        console.log('not allowed')
                        setIsUserAllowed(false);
                        setIsFormAllowed(true)
                    }else
                    {
                        console.log('allowed')
                        setIsUserAllowed(true);

                    }
                })
                .catch(err => console.log(err))
        }
        if( authState === "SIGN UP" && password.trim().length >=6 && password === confirmPassword && isUserAllowed){
            setIsFormAllowed(false);
        }
        if( authState === "SIGN IN" && password.trim().length >=6 && userName.trim().length >= 3){
            setIsFormAllowed(false);
        }
        

    }, [authState, userName, password, confirmPassword])
  
    const { signIn, signUp } = useAuth();    
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (authState === "SIGN UP" && confirmPassword)
        {
            signUp(userName, password, confirmPassword);
        }
        else if (authState === "SIGN IN")
        {
            const res = await signIn(userName, password);
            console.log(res)
        }
    }
    return (
        <form
            className={styles.authForm}
            onSubmit={onSubmit}
        >
            <div
                className={styles.authFormInputContainer}
            >
                <div
                    className={styles.authFormLabelContainer}
                >
                    <label
                        className={styles.authLabel}
                        htmlFor="userName"
                    >
                        User Name:
                    </label>
                    {
                        userName.trim().length >= 3 && authState === "SIGN UP" &&
                        <span
                            className={`${styles.authFormInputRetro} ${isUserAllowed ? styles.allowed : styles.notAllowed}`}
                        >
                            {isUserAllowed? 'User Allowed' : 'User Exists'}
                        </span>
                    }
                </div>
                <input
                    type="text"
                    className={styles.authFormInput}
                    name="userName"
                    value={userName}
                    onChange={handleChange}
                />
            </div>
            <div
                className={styles.authFormInputContainer}
            >
                <div
                    className={styles.authFormLabelContainer}
                >
                    <label
                        htmlFor="password"
                        className={styles.authLabel}
                    >
                        Password:
                    </label>
                    {
                        password.trim().length >= 1 && authState === "SIGN UP" &&
                        <span
                            className={`${styles.authFormInputRetro} ${password.trim().length >= 6 ? styles.allowed : styles.notAllowed}`}
                        >
                            {password.trim().length >= 6 ? "Password is greater than 6" : "Password should be greater than 6"}
                        </span>
                    }
                </div>
                <input
                    type="password"
                    className={styles.authFormInput}
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
            </div>
            {
                authState === "SIGN UP" &&
                <div
                    className={styles.authFormInputContainer}
                >
                    <label
                        className={styles.authLabel}
                        htmlFor="confirmPassword"
                    >
                        Confirm password: 
                    </label>
                    <input
                        type="password"
                        className={styles.authFormInput}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                </div>
            }
            <Button
                text={authState}
                onClick={() => { }}
                className={`${!isFormAllowed ? styles.authFooterButton : styles.authFooterButtonDisabled}`}
                isDisabled={isFormAllowed}
            >
                <img src={arrow} alt="arrow" className={styles.authImageButton} />
            </Button>
        </form>
    );
}