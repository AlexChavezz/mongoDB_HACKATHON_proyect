import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { AuthModalContext } from "../context/AuthModalContext";
import { API } from "../helpers/API";
import { useAlert } from "./useAlert";


export const useAuth = () => {
    const { setUser } = useContext(AuthContext);
    const { setShowAuthModal } = useContext(AuthModalContext);
    const { set, clear } = useAlert()
    async function signIn(userName: string, password: string) {
        let data;
        if(validateAuth(userName, password))
        {
            try {
                const res = await window.fetch(`${API}/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userName, password })
                });
                const { token, ...rest } = await res.json();
                data = { ...rest, token };
                if (token) {
                    // -> save token in local storage
                    window.localStorage.setItem('token', JSON.stringify(token));
                    // -> change my authstate
                    setUser({ ...rest, token });
                    setShowAuthModal(false);
                }
                // -> dispatch alert action
                set(data.message);
                setTimeout(()=> {
                    clear()
                }, 2000)
            }
            catch (error) {
                console.log(error)
                set("Error try again");
                setTimeout(()=> {
                    clear()
                }, 2000)
            }
        }
    }


    function validateAuth(userName: string, password: string, confirmPassword?: string) {
        if (userName.trim().length < 3) {
            set("Username should be gratter than 3 characters");
            setTimeout(()=> {
                clear()
            }, 2000)
            return false;
        }
        if (password.trim().length < 6) {
            set("Password should be gratter than 6 characters");
            setTimeout(()=> {
                clear()
            }, 2000)
            return false;
        }
        if (confirmPassword && password !== confirmPassword) {
            set("Passwords do not match");
            setTimeout(()=> {
                clear()
            }, 2000)
            return false;
        }
        return true;
    }

    

    async function signUp(userName: string, password: string, confirmPassword: string) {
        if (validateAuth(userName, password, confirmPassword)) {
            try {
                const response = await window.fetch(`${API}/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userName, password, confirmPassword })
                })
                const data = await response.json();
                if(data.message)
                {
                    set(data.message)
                    setTimeout(()=> {
                        clear()
                    }, 2000)
                }
                if (data.token) {
                    window.localStorage.setItem('token', JSON.stringify(data.token));
                    setUser({ ...data, token: data.token });
                    return setShowAuthModal(false);
                }
                // -> dispatch alert action
            }
            catch (error) {
                console.log(error)
                set("Error try again");
                setTimeout(()=> {
                    clear()
                }, 2000)
            }            
        }
    }

    function logout() {
        window.localStorage.removeItem('token');
        setUser(null);
    }

    return {
        signIn,
        signUp,
        logout
    }
}
