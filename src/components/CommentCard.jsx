import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';

export default function CommentCard( {comment, users, username, isCommentEditedSuccessfully, setIsCommentEditedSuccessfully, isCommentDeletedSuccessfully, setIsCommentDeletedSuccessfully} ) {
    const [ isEditCommentButtonVisible, setIsEditCommentButtonVisible ] = useState( true );
    const [ isDeleteCommentButtonVisible, setIsDeleteCommentButtonVisible ] = useState( true );
    const [ isCancelEditCommentButtonVisible, setIsCancelEditCommentButtonVisible ] = useState( false );
    const [ isUpdateCommentButtonVisible, setIsUpdateCommentButtonVisible ] = useState( false );
    const [ isDeleteCommentConfirmationMessageVisible, setIsDeleteCommentConfirmationMessageVisible ] = useState( false );
    const [ isDeleteCommentNoButtonVisible, setIsDeleteCommentNoButtonVisible ] = useState( false );
    const [ isDeleteCommentYesButtonVisible, setIsDeleteCommentYesButtonVisible ] = useState( false );
    const [ editCommentInput, setEditCommentInput ] = useState( "" );

    useEffect(() => {
        setEditCommentInput(comment.body);
    }, [])

    const userAccount = users.filter((user) => {
        return user.username === comment.owner;
    })

    function onClickEditCommentButton() {
        setIsEditCommentButtonVisible(false);
        setIsDeleteCommentButtonVisible(false);
        setIsCancelEditCommentButtonVisible(true);
        setIsUpdateCommentButtonVisible(true);
    }

    function onClickCancelEditCommentButton() {
        setIsEditCommentButtonVisible(true);
        setIsDeleteCommentButtonVisible(true);
        setIsCancelEditCommentButtonVisible(false);
        setIsUpdateCommentButtonVisible(false);
        setEditCommentInput(comment.body)
    }

    function onClickDeleteCommentButton() {
        setIsEditCommentButtonVisible(false);
        setIsDeleteCommentButtonVisible(false);
        setIsDeleteCommentConfirmationMessageVisible(true);
        setIsDeleteCommentNoButtonVisible(true);
        setIsDeleteCommentYesButtonVisible(true);
    }

    function onClickDeleteCommentNoButton() {
        setIsDeleteCommentConfirmationMessageVisible(false);
        setIsDeleteCommentNoButtonVisible(false);
        setIsDeleteCommentYesButtonVisible(false);
        setIsEditCommentButtonVisible(true);
        setIsDeleteCommentButtonVisible(true);
    }

    function onClickDeleteCommentYesButton() {
        setIsCommentDeletedSuccessfully(null);
        api.deleteComment(comment.comment_id)
            .then((response) => {
                setIsCommentDeletedSuccessfully(true);
                setTimeout(() => {
                    setIsCommentDeletedSuccessfully(null);
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
                setIsCommentDeletedSuccessfully(false);
                setTimeout(() => {
                    setIsCommentDeletedSuccessfully(null);
                }, 3000);
                setIsDeleteCommentConfirmationMessageVisible(false);
                setIsDeleteCommentNoButtonVisible(false);
                setIsDeleteCommentYesButtonVisible(false);
                setIsEditCommentButtonVisible(true);
                setIsDeleteCommentButtonVisible(true);
            })
    }

    function onChangeEditCommentInput(event) {
        setEditCommentInput(event.target.value);
    }

    function onClickUpdateCommentButton() {
        setIsCommentEditedSuccessfully(null);
        api.editComment(comment.comment_id, editCommentInput)
            .then((response) => {
                setIsCommentEditedSuccessfully(true);
                setTimeout(() => {
                    setIsCommentEditedSuccessfully(null);
                }, 3000);
                setIsCancelEditCommentButtonVisible(false);
                setIsUpdateCommentButtonVisible(false);
                setIsEditCommentButtonVisible(true);
                setIsDeleteCommentButtonVisible(true);
                setEditCommentInput(editCommentInput);
            })
            .catch((error) => {
                console.log(error);
                setIsCommentEditedSuccessfully(false);
                setTimeout(() => {
                    setIsCommentEditedSuccessfully(null);
                }, 3000);
                setIsCancelEditCommentButtonVisible(false);
                setIsUpdateCommentButtonVisible(false);
                setIsEditCommentButtonVisible(true);
                setIsDeleteCommentButtonVisible(true);
                setEditCommentInput(comment.body);
            })
    }

    const dateAndTime = new Date(parseInt(comment.timestamp)).toLocaleString().replace(",", " ");
    const date = dateAndTime.slice(0, 10);
    const time = dateAndTime.slice(11);

    return (
        <div className="comment-card">
            <div id="comment-card-owner-image-username-and-timestamp">
                <Link to={`/profile/${comment.owner}`}>
                    <img id="comment-card-owner-profile-image" src={userAccount[0]?.profile_image_url} alt="image"></img>
                </Link>
                <div id="comment-card-owner-username-and-timestamp">
                    <Link to={`/profile/${comment.owner}`} id="comment-card-owner-username">{comment.owner}</Link>
                    <div id="comment-card-timestamp">{new Date(parseInt(comment.timestamp)).toLocaleString().replace(",", " ")}</div>
                </div>             
            </div>

            <div id="comment-card-body">
                {isCancelEditCommentButtonVisible
                    ? <textarea
                        id="edit-comment-input"
                        name="edit-comment-input"
                        value={editCommentInput}
                        onChange={onChangeEditCommentInput}>
                      </textarea>
                    : <div id="comment-card-body-text">{comment.body}</div>}                
            </div>

            <div id="comment-card-buttons">
                {username === comment.owner && isEditCommentButtonVisible
                    ? <button onClick={onClickEditCommentButton}>Edit</button>
                    : null}

                {username === comment.owner && isCancelEditCommentButtonVisible
                    ? <button onClick={onClickCancelEditCommentButton}>Cancel</button>
                    : null}
                
                {username === comment.owner && isUpdateCommentButtonVisible
                    ? <button onClick={onClickUpdateCommentButton}>Update</button>
                    : null}
                
                {username === comment.owner && isDeleteCommentButtonVisible
                    ? <button onClick={onClickDeleteCommentButton}>Delete</button>
                    : null}

                {username === comment.owner && isDeleteCommentNoButtonVisible
                    ? <button onClick={onClickDeleteCommentNoButton}>No</button>
                    : null}

                {username === comment.owner && isDeleteCommentYesButtonVisible
                    ? <button onClick={onClickDeleteCommentYesButton}>Yes</button>
                    : null}
                
                {username === comment.owner && isDeleteCommentConfirmationMessageVisible
                    ? <span>Delete comment?</span>
                    : null}
            </div>
        </div>
    )
}