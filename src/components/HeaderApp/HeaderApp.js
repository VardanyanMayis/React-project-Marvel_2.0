import {NavLink} from 'react-router-dom';

import './HeaderApp.scss';

const HeaderApp = () => {
    return (
        <header className="header">
            <div className="logo">Marvel <span>information portal</span></div>
            <menu className='menu'>
                <ul className='menu__items'>
                    <li>
                        <NavLink to='/'>Characters</NavLink>
                    </li>
                    /
                    <li>
                        <NavLink to='/comixes'>Comics</NavLink>
                    </li>
                </ul>
            </menu>
        </header>
    )
} 

export default HeaderApp;
