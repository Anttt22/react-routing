import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { addComment, getAllComments } from '../../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList'


const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { quoteId } = params

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments)

  console.log(loadedComments)

  useEffect(() => {
    sendRequest(quoteId)
  }, [quoteId, sendRequest])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };


  const AddedCommentHandler =useCallback(() => { 
    sendRequest(quoteId)
  },[sendRequest, quoteId]) 



  let comments;

  if (status === 'pending') {
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>)
  }

  if (status === 'completed'&& loadedComments && loadedComments.length>0) {
    comments = (<CommentsList comments={loadedComments} />
    )
  }

  if (status === 'completed'&& (!loadedComments || loadedComments.length===0))
   {
    console.log(loadedComments)
    comments = <p className='centered'>no comments were added yet</p>
   }




  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm
        quoteId={quoteId}
        onAddedComment={AddedCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
