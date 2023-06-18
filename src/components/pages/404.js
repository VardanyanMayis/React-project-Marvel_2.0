import { Link } from "react-router-dom";

import './404.scss';

const Page404 = () => {
    return (
        <div className="error__404">
            <h2>404 Error</h2>
            <p>This page doesn't exist.</p>
            <p>Would you like go to <Link to='/'>Home Page</Link></p>   
        </div>
    )
}

export default Page404;
