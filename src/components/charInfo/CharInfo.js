import './charInfo.scss';
import { Component } from 'react';
import thor from '../../resources/img/thor.jpeg';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Sceleton from '../skeleton/Skeleton'
import MarvelServices from '../../services/MarvelServices';


class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error:false
      }
      marvelService = new MarvelServices();

    componentDidMount(){
        this.updateChar();
    }
    componentDidUpdate(prevProps,prevState){
        if (this.props.charId!==prevProps.charId) {
            this.updateChar();
        }
    }
    onError = () => {
        this.setState({
          loading: false,
          error:true
        })
        console.log(this.props.charId)
      }
    onCharLoaded = (char) => {
        
        this.setState({ char,loading:false });//так как это вызывается как коллбек ниже то loading станет false как только данные загрузятся
        console.log(this.props.charId)
    }
     onCharLoading=()=>{
         this.setState({
             loading:true,
             error:false
         })
     }
      updateChar=()=>{
          const {charId}=this.props;
          if(!charId){
              return;
          }
        this.onCharLoading();

          this.marvelService
                .getCharacter(charId)
                .then(this.onCharLoaded)
                .catch(this.onError)
      }
    render(){
        
        const { char, loading,error } = this.state;
        const sceleton= char || loading ||error ? null:<Sceleton/>//если ничего у нас нет то мы будем загружать skeleton 
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error|| !char) ? <View char={char} /> : null;
        return (
            <div className="char__info">
             {sceleton}
             {errorMessage}
             {spinner}
             {content}
            </div>
        )
    }
    
}

const View=({char})=>{
    const {name,description,thumbnail,homepage,wiki,comics}=char;
    const content=comics.length ?  <>{
                    
        comics.slice(0,10).map((item,id)=>{
            return(
        <li key={id} className="char__comics-item">
            {item.name}
        </li>
   
            )
        })
    }</>: <div>Not Data Yet</div>
    return(
        <>
          <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}r</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                   {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                {content}
                   
                    
                </ul>
        </>
    )
}



export default CharInfo;