import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import type { RootState } from "../store/store";
import PageNotFound from "./PageNotFound";

function formatLabel(label: string) {
    return label
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, character => character.toUpperCase());
}

function renderUserData(data: Record<string, unknown>): ReactNode {
    return Object.entries(data).map(([key, value]) => {
        if (key === "image" || key === "username") {
            return null;
        }

        if (value && typeof value === "object" && !Array.isArray(value)) {
            return (
                <section className="user-data-group" key={key}>
                    <h3>{formatLabel(key)}</h3>
                    <div className="user-data-nested">
                        {renderUserData(value as Record<string, unknown>)}
                    </div>
                </section>
            );
        }

        return (
            <p key={key}>
                <strong>{formatLabel(key)}</strong>
                <span>{Array.isArray(value) ? value.join(", ") : String(value ?? "-")}</span>
            </p>
        );
    });
}

export default function UserDetails() {
    const { id } = useParams<{ id: string }>();
    const users = useSelector((state: RootState) => state.user.users);
    const user = users.find(item => item.id === Number(id));

    if (!user) {
        return <PageNotFound />;
    }

    return (
        <main className="profile-container user-details-page container">
            <div className="user-profile-heading">
                <img src={user.image} alt={user.username} />
                <div>
                    <p className="user-profile-label">Profil utilisateur</p>
                    <h1>{user.firstName} {user.lastName}</h1>
                    <span>@{user.username}</span>
                </div>
            </div>

            <section className="user-info">
                <h2>Informations complètes</h2>
                {renderUserData(user as unknown as Record<string, unknown>)}
            </section>
        </main>
    );
}