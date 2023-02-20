import { UserContext } from '../contexts/User';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../api';
import CommentCard from './CommentCard';

export default function SinglePost( {users, setUsers} ) {
    const { username, setUsername } = useContext( UserContext );
    const { post_id } = useParams();
    const [ post, setPost ] = useState( [] );
    const [ postOwner, setPostOwner ] = useState( [] );
    const [ commentInput, setCommentInput ] = useState( "" );
    const [ comments, setComments ] = useState( [] );
    const [ isCommentPostedSuccessfully, setIsCommentPostedSuccessfully ] = useState( null );
    const [ areCommentsLoading, setAreCommentsLoading ] = useState( true );
    const [ isPostLiked, setIsPostLiked ] = useState( false );
    const [ isPostDeletedSuccessfully, setIsPostDeletedSuccessfully ] = useState( null );
    const [ isEditPostButtonVisible, setIsEditPostButtonVisible ] = useState( true );
    const [ isCancelEditPostButtonVisible, setIsCancelEditPostButtonVisible ] = useState( false );
    const [ isUpdatePostButtonVisible, setIsUpdatePostButtonVisible ] = useState( false );
    const [ isDeletePostButtonVisible, setIsDeletePostButtonVisible ] = useState( true );
    const [ isDeletePostConfirmationMessageVisible, setIsDeletePostConfirmationMessageVisible ] = useState( false );
    const [ editPostBodyTextInput, setEditPostBodyTextInput ] = useState( "" );
    const [ editPostBodyImageUrlInput, setEditPostBodyImageUrlInput ] = useState( "" );
    const [ isEditPostBodyImageUrlInputValid, setIsEditPostBodyImageUrlInputValid ] = useState( null );
    const [ isEditPostSuccessful, setIsEditPostSuccessful ] = useState( null );
    const [ isCommentEditedSuccessfully, setIsCommentEditedSuccessfully ] = useState( null );
    const [ isCommentDeletedSuccessfully, setIsCommentDeletedSuccessfully ] = useState( null );

    const navigate = useNavigate();
    useEffect(() => {
        if (!username) {
            navigate('/');
        }
    }, [])

    useEffect(() => {
        api.getPosts()
            .then((response) => {
                const selectedPost = response.filter((element) => {
                    return element.post_id === parseInt(post_id);
                })
                setPost(selectedPost);
                setEditPostBodyTextInput(selectedPost[0].body);
                if (selectedPost[0].image_url) {
                    setEditPostBodyImageUrlInput(selectedPost[0].image_url);
                }
                api.getUsers()
                    .then((response) => {
                        const selectedPostOwner = response.filter((element) => {
                            return element.username === selectedPost[0].username;
                        })
                        setPostOwner(selectedPostOwner);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }, [isPostLiked, isEditPostSuccessful])

    useEffect(() => {
        api.getUsers()
        .then((response) => {
            setUsers(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        setAreCommentsLoading(true);
        api.getCommentsByPostId(post_id)
            .then((response) => {
                setComments(response);
                setAreCommentsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setAreCommentsLoading(false);
            })
    }, [isCommentPostedSuccessfully, isCommentEditedSuccessfully, isCommentDeletedSuccessfully, isPostDeletedSuccessfully])

    function handleSubmit(event) {
        event.preventDefault();
    }

    function onChangeCommentInput(event) {
        setCommentInput(event.target.value);
        setIsCommentPostedSuccessfully(null);
    }

    function onClickSubmitCommentButton() {
        setIsCommentPostedSuccessfully(null);
        api.postComment(post_id, username, commentInput, Date.now())
            .then((response) => {
                setIsCommentPostedSuccessfully(true);
                setTimeout(() => {
                    setIsCommentPostedSuccessfully(null);
                }, 3000);
                setCommentInput("");
            })
            .catch((error) => {
                console.log(error);
                setIsCommentPostedSuccessfully(false);
                setTimeout(() => {
                    setIsCommentPostedSuccessfully(null);
                }, 3000);
            })
    }

    function updateLikes(postId, body, likes, imageUrl) {
        api.editPost(postId, body, likes, imageUrl)
            .then((response) => {
                if (!isPostLiked) {
                    setIsPostLiked(true);
                } else {
                    setIsPostLiked(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function onClickLikePost() {
        if (!isPostLiked) {
            updateLikes(post_id, post[0].body, post[0].likes + 1, post[0].image_url);
        } else {
            updateLikes(post_id, post[0].body, post[0].likes - 1, post[0].image_url);
        }
    }

    function onClickEditPostButton() {
        setIsEditPostButtonVisible(false);
        setIsDeletePostButtonVisible(false);
        setIsCancelEditPostButtonVisible(true);
        setIsUpdatePostButtonVisible(true);
    }

    function onChangeEditPostBodyTextInput(event) {
        setEditPostBodyTextInput(event.target.value);
    }

    function onChangeEditPostBodyImageUrlInput(event) {
        setEditPostBodyImageUrlInput(event.target.value);
    }

    function onClickCancelEditPostButton() {
        setIsCancelEditPostButtonVisible(false);
        setIsUpdatePostButtonVisible(false);
        setIsEditPostButtonVisible(true);
        setIsDeletePostButtonVisible(true);
        setEditPostBodyTextInput(post[0].body);
        setEditPostBodyImageUrlInput(post[0].image_url);
    }

    function onClickUpdatePostButton() {
        setIsEditPostBodyImageUrlInputValid(null);
        setIsEditPostSuccessful(null);
        const isImageUrl = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
        if (isImageUrl.test(editPostBodyImageUrlInput) || editPostBodyImageUrlInput.length === 0) {
            setIsEditPostBodyImageUrlInputValid(true);
            api.editPost(post_id, editPostBodyTextInput, post[0].likes, editPostBodyImageUrlInput)
                .then((response) => {
                    setIsEditPostSuccessful(true);
                    setTimeout(() => {
                        setIsEditPostSuccessful(null);
                    }, 3000);
                    setIsUpdatePostButtonVisible(false);
                    setIsCancelEditPostButtonVisible(false);
                    setIsEditPostButtonVisible(true);
                    setIsDeletePostButtonVisible(true);
                })
                .catch((error) => {
                    console.log(error);
                    setIsEditPostSuccessful(false);
                    setTimeout(() => {
                        setIsEditPostSuccessful(null);
                    }, 3000);
                    setIsUpdatePostButtonVisible(false);
                    setIsCancelEditPostButtonVisible(false);
                    setIsEditPostButtonVisible(true);
                    setIsDeletePostButtonVisible(true);
                })
        } else {
            setIsEditPostBodyImageUrlInputValid(false);
            setTimeout(() => {
                setIsEditPostBodyImageUrlInputValid(null);
            }, 3000);
        }
    }

    function onClickDeletePostButton() {
        setIsDeletePostButtonVisible(false);
        setIsDeletePostConfirmationMessageVisible(true);
        setIsEditPostButtonVisible(false);
        setIsPostDeletedSuccessfully(null);
    }

    function onClickDeletePostNo() {
        setIsDeletePostConfirmationMessageVisible(false);
        setIsEditPostButtonVisible(true);
        setIsDeletePostButtonVisible(true);
    }

    function onClickDeletePostYes() {
        setIsPostDeletedSuccessfully(null);
        api.deletePost(post_id)
            .then((response) => {
                setIsPostDeletedSuccessfully(true);
                setIsDeletePostConfirmationMessageVisible(false);
                if (comments.length > 0) {
                    api.deleteAllCommentsByPostId(post_id);
                }                  
            })
            .then(() => {
                setTimeout(() => {
                    navigate('/');
                }, 3000);    
            })
            .catch((error) => {
                console.log(error);
                setIsPostDeletedSuccessfully(false);
                setTimeout(() => {
                    setIsPostDeletedSuccessfully(null);
                }, 3000);       
                setIsDeletePostConfirmationMessageVisible(false);
                setIsEditPostButtonVisible(true);
                setIsDeletePostButtonVisible(true);
            })
    }

    return (
        <main id="single-post">
            <div id="single-post-info-and-body">
                <div id="single-post-owner-profile-image-and-username">
                    <Link to={`/profile/${post[0]?.username}`}>
                        <img id="single-post-owner-profile-image"src={postOwner[0]?.profile_image_url}></img>
                    </Link>                    
                    <Link to={`/profile/${post[0]?.username}`} id="single-post-owner-username">{post[0]?.username}</Link>
                </div>

                <div>
                    {isCancelEditPostButtonVisible
                        ? <div>
                            <textarea
                                id="edit-post-body-text-input"
                                name="edit-post-body-text-input"
                                value={editPostBodyTextInput}
                                onChange={onChangeEditPostBodyTextInput}
                                maxLength="300">                            
                            </textarea>
                            <div id="edit-post-body-characters">Characters: {editPostBodyTextInput.length}/300</div>
                        </div>
                        
                        : <p id="single-post-body-text">{post[0]?.body}</p>}

                    {isCancelEditPostButtonVisible
                        ? <div>
                            <p>Enter new image URL:</p>

                            {isEditPostBodyImageUrlInputValid === null || isEditPostBodyImageUrlInputValid === true
                                ? null
                                : <div className="error">Please enter a valid image URL.</div>}

                            <input
                                type="text"
                                id="edit-post-body-image-url-input"
                                name="edit-post-body-image-url-input"
                                className="url-input"
                                value={editPostBodyImageUrlInput}
                                onChange={onChangeEditPostBodyImageUrlInput}>                            
                            </input>
                          </div>                        
                        : null}

                    <img id="single-post-body-image" src={post[0]?.image_url}></img>       
                </div>

                <div id="single-post-likes-and-timestamp">
                    <div id="single-post-timestamp">{new Date(parseInt(post[0]?.timestamp)).toLocaleString().replace(",", " ")}</div>
                    <div id="single-post-likes"onClick={onClickLikePost} className="like"><span id="heart">&#x2665;</span> {post[0]?.likes}</div>                    
                </div>
            </div>

            <br />

            <div id="single-post-edit-and-delete-post-buttons">
                {isEditPostSuccessful === null
                    ? null
                    : isEditPostSuccessful === true
                        ? <span className="success">Post was updated.</span>
                        : <span className="error">Post could not be updated.</span>}
                
                {isPostDeletedSuccessfully === null
                    ? null
                    : isPostDeletedSuccessfully === true
                        ? <span className="success">Post is being deleted.</span>
                        : <span className="error">Post could not be deleted.</span>}
                
                {post[0]?.username === username && isEditPostButtonVisible
                    ? <button onClick={onClickEditPostButton}>Edit Post</button>
                    : null}
                
                {isCancelEditPostButtonVisible
                    ? <button onClick={onClickCancelEditPostButton}>Cancel Edit</button>
                    : null}

                {isUpdatePostButtonVisible
                    ? <button onClick={onClickUpdatePostButton} disabled={editPostBodyTextInput.length === 0}>Update Post</button>
                    : null}

                {post[0]?.username === username && isDeletePostButtonVisible
                    ? <button onClick={onClickDeletePostButton}>Delete Post</button>
                    : null}
                
                {isDeletePostConfirmationMessageVisible
                    ? <div id="single-post-delete-post-confirmation-message-and-buttons">
                        <span>Delete post?</span>                    
                        <button onClick={onClickDeletePostNo}>No</button>
                        <button onClick={onClickDeletePostYes}>Yes</button>                
                      </div>
                    : null}
            </div>
            

            <h2>Post a Comment</h2>

            <form onSubmit={handleSubmit} id="form-post-a-comment">
                <textarea
                    id="input-comment"
                    name="input-comment"
                    value={commentInput}
                    onChange={onChangeCommentInput}
                    maxLength="300">
                </textarea>

                <div id="single-post-submit-comment-button-and-messages">
                    {isCommentPostedSuccessfully === null
                        ? null
                        : isCommentPostedSuccessfully === true
                            ? <div className="success">Comment was posted successfully.</div>
                            : <div className="error">Comment could not be posted.</div>}

                    <button onClick={onClickSubmitCommentButton} disabled={commentInput.length === 0}>Submit Comment</button>
                </div>                
            </form>

            <h2>Comments ({comments.length})</h2>

            {areCommentsLoading ? <p>Loading comments...</p> : null}

            {comments.length === 0
                ? <p>No one has posted any comments yet. Be the first to share your thoughts on this post.</p>
                : null}

            {isCommentEditedSuccessfully === null
                ? null
                : isCommentEditedSuccessfully === true
                    ? <p className="success">Comment has been updated.</p>
                    : <p className="error">Comment could not be updated.</p>}

            {isCommentDeletedSuccessfully === null
                ? null
                : isCommentDeletedSuccessfully === true
                    ? <p className="success">Comment has been deleted.</p>
                    : <p className="error">Comment could not be deleted.</p>}

            <div id="comment-cards">
                {comments.map((comment) => {
                    return <CommentCard
                        key={comment.comment_id}
                        comment={comment}
                        users={users}
                        username={username}
                        isCommentEditedSuccessfully={isCommentEditedSuccessfully}
                        setIsCommentEditedSuccessfully={setIsCommentEditedSuccessfully}
                        isCommentDeletedSuccessfully={isCommentDeletedSuccessfully}
                        setIsCommentDeletedSuccessfully={setIsCommentDeletedSuccessfully}
                    />
                })}
            </div>

            <Link to="/create-a-post" id="create-post-button" title="Create Post">+</Link>
        </main>
    )
}