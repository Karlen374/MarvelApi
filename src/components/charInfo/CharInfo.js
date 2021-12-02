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
      }
    onCharLoaded = (char) => {
        this.setState({ char,loading:false });//так как это вызывается как коллбек ниже то loading станет false как только данные загрузятся
      }
     onCharLoading=()=>{
         this.setState({
             loading:true
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
    const {name,description,thumbnail,homepage,wiki}=char;
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
                    <li className="char__comics-item">
                        All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    <li className="char__comics-item">
                        Alpha Flight (1983) #50
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #503
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #504
                    </li>
                    <li className="char__comics-item">
                        AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Vengeance (2011) #4
                    </li>
                    <li className="char__comics-item">
                        Avengers (1963) #1
                    </li>
                    <li className="char__comics-item">
                        Avengers (1996) #1
                    </li>
                </ul>
        </>
    )
}

export default CharInfo;