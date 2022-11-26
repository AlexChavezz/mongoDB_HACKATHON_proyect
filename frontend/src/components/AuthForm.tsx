import { useEffect, useState } from "react";
import { developmentAPI } from "../helpers/developmentAPI";
import { useForm } from "../hooks/useForm";
import { AuthFormInterface, AuthFormProps } from "../interfaces/intefaces";
import styles from '../styles/AuthFormComponent.module.css';



const inititalState = {
    userName: '',
    password: '',
    captcha: ''
}


export const AuthForm = ({ authState }: AuthFormProps) => {
    const [isUserAllowed, setIsUserAllowed] = useState<boolean | null>(null);
    const { handleChange, values } = useForm<AuthFormInterface>(inititalState);
    const { userName, password, captcha } = values;
    useEffect(() => {
        if (authState === "SIGN UP" && userName.trim().length >= 3) {
            window.fetch(`${developmentAPI}/validateIfExistsByAutoComplete/${userName}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setIsUserAllowed(data.isAllowed);
                })
                .catch(err => console.log(err))
        }

    }, [authState, userName])
    // length should be greater than 6
    function signIn() {

    }
    function signUp() {

    }

    return (
        <form
            className={styles.authForm}
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
                <label
                    htmlFor="password"
                    className={styles.authLabel}
                >
                    Password:
                </label>
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
        </form>
    );
}