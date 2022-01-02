import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link, Route } from "react-router-dom"

const Page404=()=>{
  return(
    <div>
      <ErrorMessage/>
      <p style={{'textAlign':'center','fontWeight':'bold','fontSize':'24px'}}>Page doesn't exist</p>
      <Link style={{'display':'block','textAlign':'center','fontWeight':'bold','fontSize':'24px','marginTop':'30px'}} to="/" ><div>Back to main page</div></Link>
    </div>
  )
} 
export default Page404;