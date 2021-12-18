import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelServices from '../../services/MarvelServices';
import {useState,useEffect} from 'react';
import Spinner from '../spinner/Spinner';
const ComicsList = () => {
    const [offset,setOffset]=useState(8);
    const [data,setData]=useState([]);
    const {getAllComics,loading}=useMarvelServices();

   useEffect(()=>{
       onRequest(offset);
   },[])

    const onRequest = (offset) => {
        
        getAllComics(offset).then(onComicsLoaded)
        
     }

   const onComicsLoaded=(Comics)=>{
    setData(data=>[...data,...Comics]);
    setOffset(()=>offset+8);
   }
   {
    const content=loading?<Spinner/>:<Comics data={data}/>
    return (
        <div className="comics__list">
           {content}
            <button onClick={()=>onRequest(offset)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
   }
    
}
const Comics=({data})=>{
    const Elements=data.map((item)=>{
        return(
        <ComicsItem
        key={item.id}
        {...item}
        />)
    })
    return(
        <ul className="comics__grid">
        {Elements}
        </ul>
    )
}
const ComicsItem=(props)=>{
    const {price,thumbnail,title}=props
    return(
        <li className="comics__item">
            <a href="#">
                <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}$</div>
            </a>
        </li>
    )
}
export default ComicsList;