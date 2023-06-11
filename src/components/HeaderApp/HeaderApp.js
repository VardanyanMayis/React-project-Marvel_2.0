import './HeaderApp.scss';

const HeaderApp = () => {
    return (
        <header className="header">
            <div className="logo">Marvel <span>information portal</span></div>
            <menu className='menu'>
                <ul className='menu__items'>
                    <li className='active'>Characters</li>
                    /
                    <li>Comics</li>
                </ul>
            </menu>
        </header>
    )
} 

export default HeaderApp;
