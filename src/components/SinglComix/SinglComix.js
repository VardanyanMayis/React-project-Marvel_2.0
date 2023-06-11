import './SinglComix.scss';

import comix from '../../resources/img/UW.png'

const SinglComix = () => {
    return (
        <div className="comix__item__container">
            <div className="comix_info__block">
                <div className="img__box">
                    <img src={comix} alt="img of comix" />
                </div>
                <div className="comix_info">
                    <h2 className="info__title">
                        X-Men: Days of Future Past
                    </h2>
                    <ul className="info__list">
                        <li>Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</li>
                        <li>144 pages</li>
                        <li>Language: en-us</li>
                        <li className="price">9.99$</li>
                    </ul>
                </div>
            </div>

            <div className="go__to__back">
                <p>Back to all</p>
            </div>
        </div>
    )
}

export default SinglComix;
