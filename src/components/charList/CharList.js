import './charList.scss';
import {useState,useEffect} from 'react'
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';

const CharList =(props)=>{
  const [data,setData]=useState([]);
  const [newItemLoading,setNewItemLoading]=useState(false);
  const [offset,setOffset]=useState(211);
  const [charEnded,setCharEnded]=useState(false);
  const [selectedId,setId]=useState(-1);
  const [firstUpd,setFirstUpd]=useState(true)
  
  

  
  const {loading,getAllCharacters}=useMarvelServices();

  useEffect(() => {
    onRequest(offset);
    
    },[])//выполниться 1 раз только при создании 

  
  const onRequest = (offset) => {
   
     setNewItemLoading(newItemLoading=> false);
    getAllCharacters(offset).then(onCharsLoaded)
  
  }


 const onCharsLoaded = (Chars) => {

    let ended = false;
    if (Chars.length < 9) {
      ended = true;
    }
    setData(data=>[...data,...Chars]);
    setNewItemLoading(newItemLoading=>false);
    setOffset(offset=>offset+9);
    setFirstUpd(false);
    setCharEnded(charEnded=>ended);
    
  }

  const focusOnItem=(id)=>{
    setId(selectedId=>id);
  }
  

  
 {
    const content = loading && firstUpd ? <Spinner /> : <Element selectedId={selectedId}  data={data} onCharSelected={props.onCharSelected} focusOnItem={focusOnItem}  />;
    return (
      
      <div className="char__list">
        {content}    
        <button onClick={() => onRequest(offset)} disabled={newItemLoading} style={{ 'display':charEnded?'none':'block'}} className="button button__main button__long">
              <div className="inner">load more</div>
          </button>
      </div>
  )
  }
   
}

const Element = ({ data, onCharSelected,selectedId,focusOnItem}) => {
  
  const elements = data.map((item) => {
    const active = (item.id === selectedId);
    const ourClass=active?'char__item char__item_selected':'char__item'
    return(
      <ElementItem
        key={item.id}
        {...item}
        ourClass={ourClass}
        focusOnItem={()=>focusOnItem(item.id)}
        onCharSelected={()=>onCharSelected(item.id)}
        
      />
    )
      
  })
  return(
    <ul className="char__grid">
        {elements}
    </ul>
  )
}

const ElementItem=(props)=>{
  const { name, thumbnail, onCharSelected,focusOnItem,ourClass} = props;
  let CharImg = "char__item__img" ;
  if (thumbnail==="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") CharImg="char__item__no__img"
  
  return(
    <li   tabIndex={0}
          
          onClick={() => {
            onCharSelected();
            focusOnItem();
          }}
          className={ourClass}>
          <img className={CharImg} src={thumbnail} alt="abyss"/>
          <div className="char__name">{name}</div>
    </li> 
  )
}

CharList.propTypes={
  onCharSelected: PropTypes.func.isRequired
}

export default CharList;
