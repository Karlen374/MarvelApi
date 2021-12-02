class MarvelServices{
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apikey = 'apikey=92ce9d18622727f3eb0082966398b836';
  getResource= async(url)=> {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Cold not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters = async() => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apikey}`)
    return res.data.results.map(this._transformCharacter);//так это массив персонажей мы их с помощью map меняем и в итоге формуруется массив с уже имененными и удобными объектами 
  }
  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apikey}`)
    return this._transformCharacter(res.data.results[0])

  }
  _transformCharacter = (char) => {
    if (char.description.length>120) char.description=char.description.slice(0,120)+'...'
    return {
        id:char.id,
        name: char.name,
        description: char.description || 'No data yet',
        thumbnail: char.thumbnail.path + '.'+char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki:char.urls[1].url
      }
  }
}
export default MarvelServices;