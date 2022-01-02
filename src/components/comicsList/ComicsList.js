import './comicsList.scss';
import {Link} from 'react-router-dom';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelServices from '../../services/MarvelServices';
import {useState,useEffect} from 'react';
import Spinner from '../spinner/Spinner';


const ComicsList = () => {
    const [offset,setOffset]=useState(8);
    const [data,setData]=useState([]);
    const [firstLoading,setFistLoading]=useState(false);
    const [newItemLoading,setNewItemLoading]=useState(false);


    const {getAllComics,loading,getComics}=useMarvelServices();
    
    
   useEffect(()=>{
       onRequest(offset);
   },[])

    const onRequest = (offset) => {
        
        getAllComics(offset).then(onComicsLoaded)
        console.log(getAllComics(offset));
     }

   const onComicsLoaded=(Comics)=>{
       setFistLoading(true);
    setData(data=>[...data,...Comics]);
    setNewItemLoading(newItemLoading=>false);
    setOffset(()=>offset+8);
   }
   {
    const content=loading && !firstLoading?<Spinner/>:<Comics data={data} />
    return (
        <div className="comics__list">
           {content}
            <button onClick={()=>onRequest(offset)} disabled={newItemLoading} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
   }
    
}
const Comics=({data})=>{
    const Elements=data.map((item,id)=>{
        return(
        <ComicsItem
        key={id}
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
    const {id,price,thumbnail,title}=props
    const comicsPrice =price?price+'$': 'Not Aviable Yet';
    
    return(
        <li className="comics__item" >
            <Link to={`/comics/${id}`}>
                <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{comicsPrice}</div>
            </Link>
        </li>
    )
}
export default ComicsList;