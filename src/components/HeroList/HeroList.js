import { useState, useEffect, useRef } from 'react';

import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import { Fragment } from 'react';

import './HeroList.scss';


const HeroList = (props) => {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(300);
    const [newHeroloading, setNewHeroloading] = useState(false);
    const [endOfList, setEndOfList] = useState(false);
    const [prevFocus, setPrevFocus] = useState(false);
    const arrayRefs = useRef([]);

    const getResurses = new MarvelServices();

    useEffect(() => {
        let startLimit = window.localStorage.getItem('firstLimit');
        if(startLimit === 0) startLimit = 9;

        onRequest(offset);
    }, []);

    useEffect(() => {
        window.localStorage.setItem('firstLimit', heroes.length);
    }, [offset])

    const onLoaded = (newHeroList, limit) => {
        let endList = false;
        if(newHeroList.length < 9) {
            endList = true;
        }

        setHeroes(heroes => [...heroes, ...newHeroList]);
        setLoading(false);
        setOffset(offset => offset + +limit);
        setNewHeroloading(false);
        setEndOfList(endList);
    }

    const onRequest = (offset, limit = 9) => {
        setNewHeroloading(true);

        getResurses.getAllHeroes(limit, offset)
            .then(heroes => onLoaded(heroes, limit))
            .catch(error => {
                setError(true);
            });
    }

    const onSelectedHeroByEnter = (event, id, index) => {
        if (event.key === "Enter") {
            onSelectedHero(id, index)
        }
    }

    const onSelectedHero = (id, index) => {
        props.onSelectedHer(id);
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
            {error ? <ErrorMessage /> : loading ? <Spinner /> : getHeroList(heroes)}

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
