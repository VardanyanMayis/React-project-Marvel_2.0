import { Component } from 'react';

import UnderFindHero from '../UnderFindHero/UnderFindHero';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MarvelServices from '../../services/MarvelServices';

import './HeroSidebarInfo.scss';


class HeroSidebarInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hero: null,
            loading: false,
            error: false
        }
        this.getRequest = new MarvelServices();
    }

    componentDidMount() {
        const {heroId} = this.props;
        if(heroId) {
            this.setState({loading:true});
            this.getHeroValue();
        } 
    }

    componentDidUpdate(prevProps) {
        if(prevProps.heroId !== this.props.heroId) {
            this.setState({loading:true});
            this.getHeroValue();
        }
    }

    onLoadHero = (hero) => {
        this.setState({hero, loading: false, error: false});
    }

    getHeroValue = () => {
        const {heroId} = this.props;

        this.getRequest.getSinglHero(heroId)
            .then(this.onLoadHero)
            .catch(() => this.setState({error: true, loading: false}));
    }

    render() {
        const {hero, loading, error} = this.state;
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
