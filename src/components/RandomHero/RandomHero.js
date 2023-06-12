import { useState, useEffect } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../Spinner/Spinner'
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './RandomHero.scss';

import armor from '../../resources/img/Armor.png';


const RandomHero = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hero, setHero] = useState({});

    const getRequest = new MarvelServices();

    // for the first run
    useEffect(() => {
        const randomBtn = document.querySelector('#getRandom');
        randomBtn.addEventListener('click', getRandomHero);
        getRandomHero();

        return () => randomBtn.removeEventListener('click', this.getRandomHero);
    }, []);


    const onLoadHero = (hero) => {
        setHero(hero);
        setError(false);
        setLoading(false);
    }

    const getRandomHero = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        setLoading(true);
        

        getRequest.getSinglHero(id)
            .then(onLoadHero)
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }

    return (
        <div className="app__rundom">
            <div className="random__result">

                {(error) ? <ErrorMessage /> : (loading) ? <Spinner /> 
                    : <ShowResult hero={hero} />}

            </div>
            <div className="get__random">
                <div 
                    style={{
                        background: `url('${armor}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'bottom right',
                    }} 
                    className="random__content">

                    <p className="get__random__title">Random character for today! <br /> Do you want to get to know him better?</p>
                    <p className="get__random__text">Or choose another one</p>

                    <button
                        id='getRandom'
                        // onClick={this.getRandomHero}
                        className='button button__main'>
                        <div className="inner">Try it</div>
                    </button>
                </div>
            </div>
        </div>
    )

}

const ShowResult = ({hero}) => {
    const {name, description, thumbnail, homePage, wiki} = hero;

    return (
        <div className="random__content">
        <div className="hero__img">
            <img src={thumbnail} className="hero__photo" alt="hero foto" />
        </div>
        <div className="hero__info">
            <div className="info__title">{name}</div>
            <div className="info__text">{description}</div>

            <div className="info__btns">
                <button className='button button__main'>
                    <div className="inner">
                        <a target="_blank" href={homePage} rel="noreferrer">HOMEPAGE</a>
                    </div>
                </button>

                <button className='button button__secondary'>
                    <div className="inner">
                        <a target="_blank" href={wiki} rel="noreferrer">WIKI</a>
                    </div>
                </button>
            </div>
        </div>
    </div>
    )        
}

export default RandomHero;
