import './charList.scss';
import {Component} from 'react'
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';


class CharList extends Component{
   constructor(props) {
     super(props);
     this.state={
       data:[],
       loading:true
     }
     
   }
  marvelService = new MarvelServices();
  componentDidMount() {
    this.updateChars();
    
  }
  onCharsLoaded=(Chars)=>{
    this.setState({
      data:Chars,
      loading:false
    })
    console.log(this.state.data)
    
  }
  updateChars=()=>{
    
    this.marvelService.getAllCharacters().then(this.onCharsLoaded);
  }
  render() {
    const content=this.state.loading?<Spinner/>:<Element data={this.state.data} onCharSelected={this.props.onCharSelected} />;
    return (
      
      <div className="char__list">
        {content}    
          <button className="button button__main button__long">
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
export default CharList;