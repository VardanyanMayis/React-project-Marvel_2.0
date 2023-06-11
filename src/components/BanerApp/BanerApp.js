import './BanerApp.scss';

import Avengers from '../../resources/img/Avengers.png';
import logo from '../../resources/img/Avengers logo.png'

const BanerApp = () => {

    return (
        <div className="app__baner">
            <div className="baner__info">
                <img src={Avengers} alt="grup of hero" />
                <ul className="banner__text">
                    <li>New comics every week!</li>
                    <li>Stay tuned!</li>
                </ul>
            </div>
            <div className="banner__logo">
                <img src={logo} alt="Avengers logo" />
            </div>
        </div>
    )
}

export default BanerApp;
