import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function Profile() {

    const users = useSelector((state: RootState) => state.user.users);
    const loggedUser = useSelector((state: RootState) => state.auth.loggedUser);

    const user = loggedUser?.id
        ? users.find(user => user.id === Number(loggedUser.id))
        : null;

    function showData(data: any) {
        if (!data) return null;

        return Object.entries(data).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                return (
                    <div key={key}>
                        <h3>{key}</h3>
                        <div className='user-info'>
                            {showData(value)}
                        </div>
                    </div>
                );
            }
            if (key == "image" || key == "username") {
                return
            }

            return (
                <p key={key}>
                    {key}: {String(value)}
                </p>
            );
        });
    }

    return (
        <div className="profile-container">
            <h2>{user?.username}</h2>
            <img src={user?.image} alt={user?.username} />
            <div className='user-info'>
                <h3>Info: </h3>
                {showData(user)}
            </div>
        </div>
    );
}