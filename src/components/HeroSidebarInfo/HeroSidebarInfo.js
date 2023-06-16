import { useState, useEffect } from 'react';

import UnderFindHero from '../UnderFindHero/UnderFindHero';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useMarvelServices from '../../services/MarvelServices';

import './HeroSidebarInfo.scss';


const HeroSidebarInfo = ({heroId}) => {
    const [hero, setHero] = useState(null);

    const {loading, error, clearError, getSinglHero} = useMarvelServices();

    useEffect(() => {
        if(heroId) {
            getHeroValue();
        }
    }, [heroId])



    const onLoadHero = (hero) => {
        setHero(hero);
    }

    const getHeroValue = () => {
        clearError();
        getSinglHero(heroId)
            .then(onLoadHero)
    }

    const showHero = (hero && !loading) ? <View hero={hero} /> : null;
    const showLoading = (loading) ? <Spinner /> : null;
    const showError = (error) ? <ErrorMessage /> : null;
    const showEmpty = (hero || loading || error) ? null : <UnderFindHero />

        return (
            <div className="hero__sidebar__block">
                {showError}
                {showLoading}
                {showHero}
                {showEmpty}
            </div>
        )
}


const View = ({hero}) => {
    let imgStyle = {'objectFit' : 'cover'};
    if (hero.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }

    return (
        <div className="hero__sidebar__Info">
        <div className="main__info">
            <div className="img__block">
                <img src={hero.thumbnail} style={imgStyle} alt="hero" />
            </div>

            <div className="hero__name">
                <p>{hero.name}</p>
                <div className="info__btns">
                    <button className='button button__main'>
                            <div className="inner">
                                <a target='_blank' href={hero.homePage} rel="noreferrer">HOMEPAGE</a>
                            </div>
                    </button>

                    <button className='button button__secondary'>
                            <div className="inner">
                                <a target='_blank' href={hero.wiki} rel="noreferrer">WIKI</a>
                            </div>
                    </button>
                </div>
            </div>
        </div>

        <div className="hero__description">
            <p>{hero.description}</p>
        </div>

        <div className="all__comix">
            <h3 className="title">Comics:</h3>
            {(hero.comics.length > 0) ? null : 'This Hero without Comics'}

            <ul className="comix__list">
                {hero.comics.map((item, id) => <li key={id}>{item.name}</li>)}
            </ul>
        </div>
    </div>
    )
}

export default HeroSidebarInfo;
