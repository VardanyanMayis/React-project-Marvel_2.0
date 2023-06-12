class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=b3b54cab6dd7b97f9a85a319540bfbf9';
    _heroStartOffset = 300;
    _heroBaseLimit = 9;

    // function for get data
    getResources = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    // get array with all heroes
    getAllHeroes = async (limit = this._heroBaseLimit, offset = this._heroStartOffset) => {
        const res = await this.getResources(`${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformForSingleHero); 
    }

    // get hero with id 
    getSinglHero = async (id) => {
        const res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformForSingleHero(res.data.results[0])
    }

    _transformForSingleHero = (hero) => {
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
}

export default MarvelServices;
