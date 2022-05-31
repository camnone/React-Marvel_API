class MarvelService {
    _apiKey = 'apikey=d8adc53fe15abe3da12e05313c34ff1'
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'

    // get запрос на сервер где мы получаем все данные 
    getResourse = async (url) => {
        let res = await fetch(url);

        if (!res.ok){
            throw new Error (`Could not fetch ${url}, status ${res.status}`);
        }
    
        return await res.json();
    }

    // Запрос на получение всех персонажей

    getAllCharacters = async () => {
        const res = await  this.getResourse(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    // Запрос на получение данных одного персонажа
    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            name:char.name,
            description:char.description ? `${char.description.slice(0,210)}...`: 'There is no descriptions for this character',
            thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}
export default MarvelService;