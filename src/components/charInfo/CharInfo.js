import './charInfo.scss';
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Sceleton from '../skeleton/Skeleton'
import MarvelServices from '../../services/MarvelServices';

const CharInfo =(props)=>{
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
    
    const   marvelService = new MarvelServices();

  useEffect(() => {
    updateChar();
    console.log('here1');
  }, [props.charId])
  
  
  const onError = () => {
    setLoading(false);
    setError(true);
    console.log(props.charId)
  }

  const onCharLoaded = (char) => {
    setLoading(false);
    
    setChar(char);
        //this.setState({ char,loading:false });//так как это вызывается как коллбек ниже то loading станет false как только данные загрузятся
    
  }
  const onCharLoading = () => {
    setLoading(true);
    setError(false);
  }
  const  updateChar=()=>{
    const { charId } = props;
    console.log(`CharId in Update=${charId}`)
          if(!charId){
              return;
          }
      onCharLoading();

         marvelService
                .getCharacter(charId)
                .then(onCharLoaded)
                .catch(onError)
        
      }
    
        
        
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
                        <div className="char__info-name">{name}</div>
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


CharInfo.propTypes = {
  charId: PropTypes.number//мы говорим что charId обязательно число
}
export default CharInfo;