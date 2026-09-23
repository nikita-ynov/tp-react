import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="not-found-container">
            <h1>Page Not Found</h1>
            <h2>404</h2>
            <Link  to="/">Home Page</Link>
        </div>
    )
}