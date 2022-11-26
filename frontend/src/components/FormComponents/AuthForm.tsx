import React, { useEffect, useState } from "react";
import { developmentAPI } from "../../helpers/developmentAPI";
import { useForm } from "../../hooks/useForm";
import { AuthFormInterface, AuthFormProps } from "../../interfaces/intefaces";
import styles from '../../styles/AuthFormComponent.module.css';
import { Button } from "./Button";
import arrow from '../../assets/arrow_right_alt_FILL0_wght400_GRAD0_opsz48.svg';



const inititalState = {
    userName: '',
    password: '',
    captcha: ''
}


export const AuthForm = ({ authState }: AuthFormProps) => {
    const [isUserAllowed, setIsUserAllowed] = useState<boolean | null>(null);
    const [isFormAllowed, setIsFormAllowed] = useState<boolean>(true);
    const { handleChange, values } = useForm<AuthFormInterface>(inititalState);
    const { userName, password, captcha } = values;
    useEffect(() => {
        setIsFormAllowed(true);
        if (authState === "SIGN UP" && userName.trim().length >= 3) {
            window.fetch(`${developmentAPI}/users/validateIfExistsByAutoComplete/${userName}`)
                .then(res => res.json())
                .then(data => {
                    setIsUserAllowed(data.isAllowed);
                })
                .catch(err => console.log(err))
            // if (password.trim().length >= 6 && captcha?.trim().length > 0) {
            //     setIsFormAllowed(false);
            // }
        }

    }, [authState, userName, password, captcha])
    // length should be greater than 6
    function validate() {
        if (userName.trim().length < 3) {
            return false;
        }
        else if (password.trim().length < 6) {
            return false;
        }
    }
    function validateSubmit() {

    }
    function signIn() {
        
    }
    function signUp() {

    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (authState === "SIGN UP")
        {
            signUp();
        }
        else if (authState === "SIGN IN")
        {
            signIn();
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
                        userName.trim().length >= 3 &&
                        <span
                            className={`${styles.authFormInputRetro} ${isUserAllowed ? styles.allowed : styles.notAllowed}`}
                        >
                            {isUserAllowed ? 'User Allowed' : 'User Exists'}
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
                        password.trim().length >= 1 &&
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
                        htmlFor="captcha"
                    >
                        Resolve:
                    </label>
                    <input
                        type="text"
                        className={styles.authFormInput}
                        name="captcha"
                        value={captcha}
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