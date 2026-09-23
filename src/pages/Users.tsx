import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

export default function Users() {
    const users = useSelector((state: RootState) => state.user.users)

    return (
        <div className="users-container">
            <h2>Users List:</h2>
            <ul>
                {users.map((user) =>
                    <div>
                        <li>
                            <img src={user.image} alt="" />
                            <p>{user.username}</p>
                        </li>
                    </div>
                )}
            </ul>
        </div>
    )
}