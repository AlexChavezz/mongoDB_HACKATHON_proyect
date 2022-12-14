import React, { useContext, useEffect, useRef, useState } from "react";
import { API } from "../../helpers/API";
import { useForm } from "../../hooks/useForm";
import { AuthFormInterface, AuthFormProps } from "../../interfaces/intefaces";
import styles from '../../styles/AuthFormComponent.module.css';
import { Button } from "./Button";
import arrow from '../../assets/arrow_right_alt_FILL0_wght400_GRAD0_opsz48.svg';
import { useAuth } from "../../hooks/useAuth";
import closeIcon from '../../assets/close_FILL0_wght400_GRAD0_opsz48.svg';
import { AuthModalContext } from "../../context/AuthModalContext";



const inititalState = {
    userName: '',
    password: '',
    confirmPassword: ''
}


export const AuthForm = ({ authState }: AuthFormProps) => {
    const [isUserAllowed, setIsUserAllowed] = useState<boolean | null>(null);
    const { handleChange, values, reset } = useForm<AuthFormInterface>(inititalState);
    const { userName, password, confirmPassword } = values;
    const { setShowAuthModal } = useContext(AuthModalContext);

    const closeModal = () => {
        setShowAuthModal(false);
        reset();
    }
    useEffect(()=>{
        reset();
    },[authState])
    const ref = useRef(userName);
    useEffect(() => {
        if( ref.current !== userName)
        {
            if (authState === "SIGN UP" && userName.trim().length >= 3) {
                ref.current = userName;
                window.fetch(`${API}/users/get-user/${userName}`)
                    .then(res => res.json())
                    .then((user) => {
                        if(user.userName)
                        {
                            setIsUserAllowed(false);
                        }else
                        {
                            setIsUserAllowed(true);    
                        }
                    })
                    .catch(err => console.log(err))
            }
        }       
    }, [authState, userName, password, confirmPassword])
  
    const { signIn, signUp } = useAuth();    
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (authState === "SIGN UP")
        {
            signUp(userName, password, confirmPassword? confirmPassword : '');
        }
        else if (authState === "SIGN IN")
        {
           signIn(userName, password);
        }
    }
    return (
        <>
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                        autoComplete="off"
                    />
                </div>
            }
            <Button
                text={authState}
                onClick={() => { }}
                className={styles.authFooterButton}
            >
                <img src={arrow} alt="arrow" className={styles.authImageButton} />
            </Button>
        </form>
        <img
            onClick={closeModal}
            src={closeIcon} 
            alt="close-icon"
            className={styles.headerCloseIcon}
        />
        </>
    );
}