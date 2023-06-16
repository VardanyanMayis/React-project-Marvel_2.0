import { useState, useEffect, useRef } from 'react';

import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import { Fragment } from 'react';

import './HeroList.scss';


const HeroList = (props) => {
    const [heroes, setHeroes] = useState([]);
    const [offset, setOffset] = useState(300);
    const [newHeroloading, setNewHeroloading] = useState(false);
    const [endOfList, setEndOfList] = useState(false);
    const [prevFocus, setPrevFocus] = useState(false);
    const arrayRefs = useRef([]);

    const {loading, error, getAllHeroes} = useMarvelServices();

    useEffect(() => {
        let startLimit = window.localStorage.getItem('firstLimit');
        if(startLimit === 0) startLimit = 9;

        onRequest(offset);
    }, []);

    const onLoaded = (newHeroList, limit) => {
        let endList = false;
        if(newHeroList.length < 9) {
            endList = true;
        }

        window.localStorage.setItem('firstLimit', heroes.length);
        setHeroes(heroes => [...heroes, ...newHeroList]);
        setOffset(offset => offset + +limit);
        setNewHeroloading(false);
        setEndOfList(endList);
    }

    const onRequest = (offset, limit = 9) => {
        setNewHeroloading(true);

        getAllHeroes(limit, offset)
            .then(heroes => onLoaded(heroes, limit))
    }

    const onSelectedHeroByEnter = (event, id, index) => {
        if (event.key === "Enter") {
            onSelectedHero(id, index)
        }
    }

    const onSelectedHero = (id, index) => {
        props.onSelectedHero(id);
        if(prevFocus !== index && prevFocus !== false) {
            arrayRefs.current[prevFocus].classList.remove('hero__item__focus');
        } 
        
        arrayRefs.current[index].classList.add('hero__item__focus');
        arrayRefs.current[index].focus();
        setPrevFocus(index)
    }

    const getHeroList = (heroes) => {

        const items = heroes.map((hero, index) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (hero.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <Fragment key={hero.id.id}>
                    <div 
                        tabIndex={0}
                        ref={el => arrayRefs.current[index] = el}
                        onClick={() => onSelectedHero(hero.id.id, index)} 
                        onKeyUp={(event) => onSelectedHeroByEnter(event, hero.id.id, index)}
                        className="hero__item" 
                        >
                        <div className="img__block">
                        <img src={hero.thumbnail} alt="foto hero"  style={imgStyle}/>
                        </div>
                        <div className="hero__name">
                            {hero.name}
                        </div>
                    </div>
                </Fragment>
            )
        })

        return (
            <>
                {items}
            </>
        )
    } 

    return (
        <div className="hero__contnet">
            <div className="hero__list">
            {getHeroList(heroes)}
            {error ? <ErrorMessage /> : (loading && heroes.length < 9) 
                ? <Spinner /> : null}

            </div>
            <button
            style={{display: (newHeroloading || endOfList) ? 'none' : 'block'}}
            onClick={() => onRequest(offset)} 
            className='button button__main'>
                <div className="inner">LOAD MORE</div>
            </button>
        </div>
    )
}

export default HeroList;
