import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { AuthModalContext } from "../context/AuthModalContext";
import { API } from "../helpers/API";


export const useAuth = () => {
    const { setUser } = useContext(AuthContext);
    const { setShowAuthModal } = useContext(AuthModalContext);

    async function signIn(userName: string, password: string) {
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
                if (token) {
                    // -> save token in local storage
                    window.localStorage.setItem('token', JSON.stringify(token));
                    // -> change my authstate
                    setUser({ ...rest, token });
                    setShowAuthModal(false);
                }
                // -> dispatch alert action
            }
            catch (error) {
                console.log(error)
            }
        }
    }


    function validateAuth(userName: string, password: string, confirmPassword?: string) {
        if (userName.trim().length < 3) {
            return false;
        }
        if (password.trim().length < 6) {
            return false;
        }
        if (confirmPassword && password !== confirmPassword) {
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
                    body: JSON.stringify({ userName, password })
                })
                const data = await response.json();
                console.log(data)
                if (data.token) {
                    window.localStorage.setItem('token', JSON.stringify(data.token));
                    setUser({ ...data, token: data.token });
                    return setShowAuthModal(false);
                }
                // -> dispatch alert action
            }
            catch (error) {
                console.log(error)
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
