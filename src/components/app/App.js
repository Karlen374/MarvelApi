import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState} from "react";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ForTest from "../forTest/forTest";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

const App =()=>{

    const [selectedChar,setChar]=useState(null);

    
    const onCharSelected=(id)=>{
        setChar(id);
    }
    
        return (
            <div className="app">
              {/* <ForTest/> */}
                <AppHeader/>
            <main>
            
              <SingleComic/>
              {/* <ErrorBoundary>
                <RandomChar onCharSelected={onCharSelected} />
              </ErrorBoundary>
                   
              <div className="char__content">
                <ErrorBoundary>
                  <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                
                <ErrorBoundary>
                  <CharInfo charId={selectedChar}/>
                </ErrorBoundary> 
                       
                    </div> */}
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
   



export default App;