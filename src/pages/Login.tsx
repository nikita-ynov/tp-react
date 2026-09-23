import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    async function submitData() {
        try {
            const token = await axios.post("https://dummyjson.com/auth/login", {
                username: username,
                password: password,
            })

            localStorage.setItem("token", token.data.accessToken)
            navigate(`/profile/`);
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