import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";
import AppBanner from '../appBanner/AppBanner';

const ComicsPage=()=>{
  return(
    <>
     <AppBanner/>
    <ComicsList/>
    </>
  )
}

export default ComicsPage;