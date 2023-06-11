import { Component, createRef } from 'react';

import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import { Fragment } from 'react';

import './HeroList.scss';


class HeroList extends Component {
    state = {
        heroes: [],
        loading: true,
        error: false,
        offset: 300,
        newHeroloading: false,
        endOfList: false,
        prevFocus: null
    }
    getResurses = new MarvelServices();

    componentDidMount() {
        const startLimit = !window.localStorage.getItem('firstLimit') ? 9
            : window.localStorage.getItem('firstLimit');
        this.onRequest(this.state.offset, startLimit);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.offset !== this.state.offset) {
            window.localStorage.setItem('firstLimit', this.state.heroes.length);
        }
    }

    onLoaded = (newHeroList, limit) => {
        let endList = false;
        if(newHeroList.length < 9) {
            endList = true;
        }

        this.setState(({heroes, offset}) => ({
            heroes: [...heroes, ...newHeroList],
            loading: false,
            offset: +offset + +limit,
            newHeroloading: false,
            endOfList: endList
        }))
    }

    onRequest = (offset, limit = 9) => {
        this.setState({newHeroloading: true})

        this.getResurses.getAllHeroes(limit, offset)
            .then(heroes => this.onLoaded(heroes, limit))
            .catch(error => {
                this.setState({error: true});
            });
    }

    onSelectedHeroByEnter = (event, id) => {
        if (event.key === "Enter") {
            this.onSelectedHero(id)
        }
    }

    onSelectedHero = (id) => {
        const {prevFocus} = this.state
        this.props.onSelectedHer(id);
        if(prevFocus !== id && prevFocus) {
            this.arrayRefs[prevFocus].current.classList.remove('hero__item__focus');
        } 
        
        this.arrayRefs[id].current.classList.add('hero__item__focus');
        this.arrayRefs[id].current.focus();
        this.setState({prevFocus: id});
    }

    getHeroList = (heroes) => {
        this.arrayRefs = {};

        const items = heroes.map(hero => {
            let imgStyle = {'objectFit' : 'cover'};
            if (hero.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            const fucusHeroItem = createRef();
            this.arrayRefs[hero.id.id] = fucusHeroItem;

            return (
                <Fragment key={hero.id.id}>
                    <div 
                        tabIndex={0}
                        ref={fucusHeroItem}
                        onClick={() => this.onSelectedHero(hero.id.id)} 
                        onKeyUp={(event) => this.onSelectedHeroByEnter(event, hero.id.id)}
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

    render() {
        const {loading, heroes, error, offset, newHeroloading, endOfList} = this.state;

        return (
            <div className="hero__contnet">
                <div className="hero__list">
                {error ? <ErrorMessage /> : loading ? <Spinner /> : this.getHeroList(heroes)}

                </div>
                <button
                style={{display: (newHeroloading || endOfList) ? 'none' : 'block'}}
                onClick={() => this.onRequest(offset)} 
                className='button button__main'>
                    <div className="inner">LOAD MORE</div>
                </button>
            </div>
        )
    }
}

export default HeroList;
