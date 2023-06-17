import {useHttp} from '../hooks/http.hook';

const useMarvelServices = () => {
    const {loading, error, clearError, response} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=b3b54cab6dd7b97f9a85a319540bfbf9';
    const _heroStartOffset = 300;
    const _heroBaseLimit = 9;

    //get array with all comixes
    const getAllComixes = async (offset) => {
        const res = await response(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformForSingleComix);
    }

    // get hero with id 
    const getSinglComix = async (id) => {
        const res = await response(`${_apiBase}comics/${id}?${_apiKey}`);
        if(res) return _transformForSingleComix(res.data.results[0]);
    }

    // get info about comix from object
    const _transformForSingleComix = (comix) => {
        return {
            id: comix.id,
            title: comix.title,
            img: comix.thumbnail.path + '.' + comix.thumbnail.extension,
            description: comix.description ? comix.description 
                : 'Sorry but about this comix information is underfind',
            page: comix.pageCount,
            price: comix.prices[0].price === 0 ? 'not on sale' 
                : comix.prices[0].price + '$'
        }
    }


    // get array with all heroes
    const getAllHeroes = async (limit = _heroBaseLimit, offset = _heroStartOffset) => {
        const res = await response(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformForSingleHero);
    }

    // get hero with id 
    const getSinglHero = async (id) => {
        const res = await response(`${_apiBase}characters/${id}?${_apiKey}`);
        if(res) return _transformForSingleHero(res.data.results[0]);
    }

    // get info about hero from object
    const _transformForSingleHero = (hero) => {
        return {
                id: hero,
                name: hero.name,
                description: (hero.description) ? hero.description.slice(0, 447) + '...'
                    : 'Sorry but information about this hero is undefined:  if you want to get information about it you can search it in google or reade documentation',
                
                thumbnail: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
                homePage: hero.urls[0].url,          
                wiki: hero.urls[0].url,
                comics: hero.comics.items.slice(0, 10)
            }
    }

    return {loading, error, clearError, getAllHeroes, 
        getSinglHero, getAllComixes, getSinglComix}
}

export default useMarvelServices;
