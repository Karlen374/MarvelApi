
import {useHttp} from '../hooks/http.hook';

const  useMarvelServices=()=>{
  const {loading,request,error,clearError}=useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const  _apikey = 'apikey=92ce9d18622727f3eb0082966398b836';//411329137e60d3da9751a8e30c0c26a9
  const  _baseOffset = 210;
  const _baseOffsetComics=0;
  // https://gateway.marvel.com:443/v1/public/comics?limit=6&apikey=411329137e60d3da9751a8e30c0c26a9

  const getAllCharacters = async(offset=_baseOffset) => {//если ничего не передать туда исползуется 210
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apikey}`)
    return res.data.results.map(_transformCharacter);//так это массив персонажей мы их с помощью map меняем и в итоге формуруется массив с уже имененными и удобными объектами 
  }
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apikey}`)
    return _transformCharacter(res.data.results[0])

  }
  const getAllComics=async(offset=_baseOffsetComics)=>{
    const res=await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apikey}`)
    return res.data.results.map(_transformComics);
  }
  const getComics=async(id)=>{
    const res=await request(`${_apiBase}comics/${id}?${_apikey}`)
    return _transformComics(res.data.results[0]);
  }
 const  _transformCharacter = (char) => {
    if (char.description.length>120) char.description=char.description.slice(0,120)+'...'
    return {
        id:char.id,
        name: char.name,
        description: char.description || 'No data yet',
        thumbnail: char.thumbnail.path + '.'+char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki:char.urls[1].url,
        comics: char.comics.items
      }
  }
  const  _transformComics = (comics) => {
  
    return {
        id:comics.id,
        title: comics.title,
        description: comics.description || 'No data yet',
        pageCount:comics.pageCount ? `${comics.pageCount} p.`:'No information about the number of pages' ,
        thumbnail: comics.thumbnail.path + '.'+comics.thumbnail.extension,
        language:comics.textObjects.language || 'en-us',
        price: comics.prices.price 
      }
  }

  return {loading,error,getAllCharacters,getCharacter,clearError,getAllComics,getComics}
}
export default useMarvelServices;