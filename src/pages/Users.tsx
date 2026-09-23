import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { Link } from "react-router-dom"

export default function Users() {
    const users = useSelector((state: RootState) => state.user.users)

    return (
        <div className="users-container">
            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <img src={user.image} alt={user.username} />
                        <div className="user-summary">
                            <p>{user.firstName} {user.lastName}</p>
                            <span>@{user.username}</span>
                        </div>
                        <Link className="user-details-link" to={`/user/${user.id}`}>
                            Voir le profil
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}