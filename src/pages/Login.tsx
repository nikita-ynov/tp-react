import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../store/reducers/auth";
import type { User } from "../types/user";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    async function submitData() {
        try {
            const response = await axios.post("https://dummyjson.com/auth/login", {
                username: username,
                password: password,
            })

            const accessToken = response.data.accessToken;
            localStorage.setItem("token", accessToken)

            const userResponse = await axios.get<User>("https://dummyjson.com/auth/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            dispatch(setLoggedUser(userResponse.data));

            navigate(`/`);
        } catch (e) {
            setError(true)
        }
    }
    return (
        <div className="login-container">
            <label htmlFor="username">
                Username
                <input type="text"
                    onChange={(e) => {
                        setUsername(e.target.value)
                        setError(false)
                    }}
                />
            </label>
            <label htmlFor="password">
                Password
                <input type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setError(false)
                    }}
                />
            </label>
            <button onClick={submitData}>Connect</button>
            {error ?
                <>
                    <span className="error">Wrong Username or Password</span>
                </>
                : <></>
            }
        </div>
    )
}