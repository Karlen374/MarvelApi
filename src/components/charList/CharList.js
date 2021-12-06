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
       charEnded: false,
       selectedId: 0
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
    this.setState(({offset,data})=>({
      data: [...data,...Chars],//...data разворачиваем старые элементы ...Chars добавляем новые к старым 
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
      

    }))
  }
  focusOnItem = (Clickid) => {
    this.setState({
      selectedId:Clickid
    })
    
  }
  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService.getAllCharacters(offset).then(this.onCharsLoaded)
  }

  
  render() {
    const { offset, newItemLoading ,charEnded} = this.state;
    const content = this.state.loading ? <Spinner /> : <Element selectedId={this.state.selectedId} data={this.state.data} onCharSelected={this.props.onCharSelected}  focusOnItem={ this.focusOnItem}/>;
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

const Element = ({selectedId, data, onCharSelected,focusOnItem}) => {
  
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
