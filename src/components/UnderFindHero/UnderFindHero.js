import './UnderFindHero.scss';

const UnderFindHero = () => {
    return (
        <div className="underfind__hero__block">
            <div className="underfind__info__block">
                <div className="desctiption">Please select a character to see information</div>
                <div className="animating-div">
                    <div className="logo__name">
                        <div className="logo"></div>
                        <div className="name"></div>
                    </div>
                    <div className="block"></div>
                    <div className="block"></div>
                    <div className="block"></div>
                </div>  
            </div>
        </div>
    )
}

export default UnderFindHero;
