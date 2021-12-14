import './charList.scss';
import {useState,useEffect,useRef} from 'react'
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';

const CharList =(props)=>{
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [newItemLoading,setNewItemLoading]=useState(false);
  const [offset,setOffset]=useState(210);
  const [charEnded,setCharEnded]=useState(false);
  const [selectedId,setSelectedId]=useState(0);

  
  const marvelService = new MarvelServices();

  useEffect(()=>{
    onRequest();
    },[])//выполниться 1 раз тоько при создании 

  
  const onRequest = (offset) => {
    onCharListLoading();
    marvelService.getAllCharacters(offset).then(onCharsLoaded)
  }

  const onCharListLoading = () => {
    setNewItemLoading(true);
  }

 const onCharsLoaded = (Chars) => {
    let ended = false;
    if (Chars.length < 9) {
      ended = true;
    }
    setData(data=>[...data,...Chars]);
    setLoading(loading=>false);
    setNewItemLoading(newItemLoading=>false);
    setOffset(offset=>offset+9);
    setCharEnded(charEnded=>ended);
    
  }
  
  // const itemRefs=useRef([]);

  // const focusOnItem = (Clickid) => {
    
  //   itemRefs.current.forEach(item=>item.classList.remove('char__item_selected');
  //   itemRefs.current[id].classList.add('char__item_selected');
  //   itemRefs.current[id].focus();
  // }
  

  
 {
    
    const content = loading ? <Spinner /> : <Element selectedId={selectedId} data={data} onCharSelected={this.props.onCharSelected}  />;
    return (
      
      <div className="char__list">
        {content}    
        <button onClick={() => this.onRequest(offset)} disabled={newItemLoading} style={{ 'display':charEnded?'none':'block'}} className="button button__main button__long">
              <div className="inner">load more</div>
          </button>
      </div>
  )
  }
   
}

const Element = ({selectedId, data, onCharSelected}) => {
  
  const elements = data.map((item) => {
    const active = (item.id === selectedId);
    const ourClass=active?'char__item char__item_selected':'char__item'
    return(
      <ElementItem
        key={item.id}
        {...item}
        ourClass={ourClass}
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
  const { name, thumbnail, onCharSelected,ourClass} = props;
  let CharImg = "char__item__img" ;
  if (thumbnail==="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") CharImg="char__item__no__img"
  
  return(
    <li   tabIndex={0}
          onClick={() => {
            onCharSelected();
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
