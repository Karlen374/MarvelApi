import './charList.scss';
import {Component} from 'react'
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';

class CharList extends Component{
   constructor(props) {
     super(props);
     this.state={
       data:[],
       loading: true,
       newItemLoading: false,
       offset: 210,
       charEnded:false
     }
     
   }
  marvelService = new MarvelServices();
  componentDidMount() {
    this.onRequest();
    
  }
  onCharListLoading = () => {
    this.setState({
      newItemLoading:true
    })
  }

  onCharsLoaded = (Chars) => {
    let ended = false;
    if (Chars.length < 9) {
      ended = true;
    }
    this.setState(({offset,data,})=>({
      data: [...data,...Chars],//...data разворачиваем старые элементы ...Chars добавляем новые к старым 
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended
    }))
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService.getAllCharacters(offset).then(this.onCharsLoaded)
  }

  
  render() {
    const { offset, newItemLoading ,charEnded} = this.state;
    const content=this.state.loading?<Spinner/>:<Element data={this.state.data} onCharSelected={this.props.onCharSelected} />;
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

const Element=({data,onCharSelected})=>{
  const elements=data.map(item=>{
    return(
      <ElementItem
      key={item.id}
      {...item}
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
  const {name,thumbnail,onCharSelected}=props;
  let CharImg = "char__item__img" ;
  if (thumbnail==="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") CharImg="char__item__no__img"
  
  return(
    <li onClick={onCharSelected} className="char__item">
                  <img className={CharImg} src={thumbnail} alt="abyss"/>
                  <div className="char__name">{name}</div>
    </li> 
  )
}

CharList.propTypes={
  onCharSelected: PropTypes.func.isRequired
}
export default CharList;
