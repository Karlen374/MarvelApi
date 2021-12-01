import { Component } from 'react';
import './randomChar.scss';
import Spinner from '../spinner/Spinner'
import MarvelServices from '../../services/MarvelServices';
import mjolnir from '../../resources/img/mjolnir.png';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component{
  
  state = {
    char: {},
    loading: true,
    error:false
  }
  marvelService = new MarvelServices();
  componentDidMount() {
    this.updateChar();
    //this.timerId = setInterval(this.updateChar, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId)
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
 
  updateChar = () => {
    const id = Math.floor(Math.random()*(1011400-1011000)+1011000);
    this.marvelService
      .getCharacter(id)//getCharacter возвращает нужный объект res и мы в then обновляем state
      .then(this.onCharLoaded)//Аргумент который в then автоматически удет подставлятся в onCharLoaded
      .catch(this.onError)//сработает только если произоша ошибка загрузки данных
    
  }
  randomUpdateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)//getCharacter возвращает нужный объект res и мы в then обновляем state
      .then(this.onCharLoaded)//Аргумент который в then автоматически удет подставлятся в onCharLoaded
      .catch(this.randomUpdateChar)
    
  }
  render() {
    const { char, loading,error } = this.state
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    return (
      <div className="randomchar">
        {errorMessage}{/*если null то просто ничего не будет рендерится */}
        {spinner}
        {content}
          <div className="randomchar__static">
              <p className="randomchar__title">
                  Random character for today!<br/>
                  Do you want to get to know him better?
              </p>
              <p className="randomchar__title">
                  Or choose another one
              </p>
              <button className="button button__main">
                  <div onClick={this.randomUpdateChar} className="inner">try it</div>
              </button>
              <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
          </div>
      </div>
  )
  }
   
}

const View = ({char}) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  let CharImg = "randomchar__img" ;
  if (thumbnail==="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") CharImg="randomchar__no__img"
 
  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className={ CharImg}/>
              <div className="randomchar__info">
            <p className="randomchar__name">{ name}</p>
                  <p className="randomchar__descr">
                     {description}
                  </p>
                  <div className="randomchar__btns">
                      <a href={homepage} className="button button__main">
                          <div className="inner">homepage</div>
                      </a>
                      <a href={wiki} className="button button__secondary">
                          <div className="inner">Wiki</div>
                      </a>
                  </div>
              </div>
          </div>
  )
}
export default RandomChar;