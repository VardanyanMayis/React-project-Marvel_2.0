import './ComixList.scss';

import comix from '../../resources/img/UW.png' //test img

const ComixList = () => {
    let maxCount = [1, 2, 3, 4, 5, 6, 8, 9];

    const elsem = maxCount.map(() => (
        <div className="comix__item">
        <div className="item__img">
            <img src={comix} alt="Comix" /> 
        </div>
        <div className="comix__title">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div> 
        <div className="comix__price">9.99$</div>
    </div>
    ));

    return (
        <div className="comix__content">
            <div className="comix__list">
                {elsem}
            </div>

            <button className='button button__main'>
                <div className="inner">Hello World</div>
            </button>
        </div>     
    )
}

export default ComixList;
