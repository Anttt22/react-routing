import { Fragment, useEffect } from "react";
import { useParams, useRouteMatch} from "react-router-dom"
import { Route, Link } from "react-router-dom";
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";



const DUMMY_QUOTES = [
    { id: 'q1', author: "Mark", text: "hello boys" },
    { id: 'q2', author: "John", text: "holly moly" },
]

const QuoteDetail = () => {
    const params = useParams();
    const match =useRouteMatch();

    const {quoteId}=params;

    const{sendRequest, status, data:loadeQuote, error}=useHttp(getSingleQuote, true);

useEffect(()=>{
    sendRequest(quoteId);
},[sendRequest, quoteId])

if(status==="pending"){
    return(
        <div className='centered'>
            <LoadingSpinner/>
        </div>
    )
}

if(error){
    return(
        <p className="centered">{error}</p>
    )
}

if(!loadeQuote.text){
    return(
        <p>No quotes found</p>
    )
}

    return (
        <Fragment>
            <HighlightedQuote text={loadeQuote.text} author={loadeQuote.author} />
           
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>

            <Route path={`${match.path}/comments`}>
                <Comments />
            
            </Route>
        </Fragment>
    )
}

export default QuoteDetail