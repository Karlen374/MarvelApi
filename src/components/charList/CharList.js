import './charList.scss';
import {Component} from 'react'
import abyss from '../../resources/img/abyss.jpg';
import MarvelServices from '../../services/MarvelServices';


class CharList extends Component{
  constructor(props) {
    super(props);
    this.state={
      data:[]
    }
  }
   componentDidMount() {
   this.updateChars();
  
   }
  updateChars = () => {
    const id = 1011400;
    this.marvelService
      .getCharacter(id)//getCharacter возвращает нужный объект res и мы в then обновляем state
      // .then(this.onCharLoaded)//Аргумент который в then автоматически удет подставлятся в onCharLoaded
      // .catch(this.onError)//сработает только если произоша ошибка загрузки данных
    
   }
  render() {
    let content = <View />;
    for (let i = 1; i < 9; i++){
      content+=<View/>
    }
    return (
      
      <div className="char__list">
        <ul className="char__grid">
          {content}
              {/* <li className="char__item">
                  <img src={abyss} alt="abyss"/>
                  <div className="char__name">Abyss</div>
              </li>
              <li className="char__item char__item_selected">
                  <img src={abyss} alt="abyss"/>
                  <div className="char__name">Abyss</div>
              </li>
              <li className="char__item">
                  <img src={abyss} alt="abyss"/>
                  <div className="char__name">Abyss</div>
              </li>
              <li className="char__item">
                  <img src={abyss} alt="abyss"/>
                  <div className="char__name">Abyss</div>
              </li>
              <li className="char__item">
                  <img src={abyss} alt="abyss"/>
                  <div className="char__name">Abyss</div>
              </li>
              <li className="char__item">
                  <img src={abyss} alt="abyss"/>
                  <div className="char__name">Abyss</div>
              </li>
              <li className="char__item">
                  <img src={abyss} alt="abyss"/>
                  <div className="char__name">Abyss</div>
              </li>
              <li className="char__item">
                  <img src={abyss} alt="abyss"/>
                  <div className="char__name">Abyss</div>
              </li>
              <li className="char__item">
                  <img src={abyss} alt="abyss"/>
                  <div className="char__name">Abyss</div>
              </li> */}
          </ul>
          <button className="button button__main button__long">
              <div className="inner">load more</div>
          </button>
      </div>
  )
  }
   
}

const View =()=>{
  
    // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    // this.marvelService
    //   .getCharacter(id)//getCharacter возвращает нужный объект res и мы в then обновляем state
    //   .then(this.onCharLoaded)//Аргумент который в then автоматически удет подставлятся в onCharLoaded
    //   .catch(this.onError)//сработает только если произоша ошибка загрузки данных
    return (
      <li className="char__item">
            <img src={abyss} alt="abyss"/>
            <div className="char__name">Abyss</div>
      </li>
    )
    
  
}

export default CharList;