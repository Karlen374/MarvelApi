import './charInfo.scss';
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Sceleton from '../skeleton/Skeleton'
import useMarvelServices from '../../services/MarvelServices';
import {Link} from 'react-router-dom';

const CharInfo =(props)=>{
  const [char, setChar] = useState(null);
  
    
   const {loading,error,getCharacter,clearError}= useMarvelServices();

  useEffect(() => {
    updateChar();
   
  }, [props.charId])
  
  
  const onCharLoaded = (char) => {
    
    setChar(char);
        //this.setState({ char,loading:false });//так как это вызывается как коллбек ниже то loading станет false как только данные загрузятся
    
  }
 
  const  updateChar=()=>{
    clearError();//для того чтобы была возможность поменять персонажа после того выскачет ошибка
    const { charId } = props;
    console.log(`CharId in Update=${charId}`)
          if(!charId){
              return;
          }
          getCharacter(charId)
                .then(onCharLoaded)
                
        
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
    console.log(comics);
    const content=comics.length ?  <>{
                    
        comics.slice(0,10).map((item,id)=>{
            return(
                <Link to={`/comics/${item.resourceURI.substr(item.resourceURI.indexOf("s/")+2)}`}>
                    <li key={id} className="char__comics-item">
                       {item.name}
                    </li>
                </Link>
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