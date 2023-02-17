import { UserContext } from '../contexts/User';
import { useNavigate } from 'react-router-dom';
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
    }, [isPostLiked])

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
    }, [isCommentPostedSuccessfully])

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
                setCommentInput("");
            })
            .catch((error) => {
                console.log(error);
                setIsCommentPostedSuccessfully(false);
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

    function onClickDeletePostButton() {
        setIsPostDeletedSuccessfully(null);
        api.deletePost(post_id)
            .then((response) => {
                setIsPostDeletedSuccessfully(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000);                
            })
            .catch((error) => {
                console.log(error);
                setIsPostDeletedSuccessfully(false);
            })
    }

    return (
        <main id="single-post">
            <h1>Single Post</h1>
            <img src={postOwner[0]?.profile_image_url}></img>
            <p>{post[0]?.username}</p>
            <p>{post[0]?.body}</p>
            {post[0]?.image_url ? <img src={post[0]?.image_url}></img> : null}            
            <p onClick={onClickLikePost} className="like">&#x2665; {post[0]?.likes}</p>
            <p>{new Date(parseInt(post[0]?.timestamp)).toLocaleString()}</p>
            {post[0]?.username === username ? <button onClick={onClickDeletePostButton}>Delete Post</button> : null}
            {isPostDeletedSuccessfully ? <span className="success">Your post has been deleted.</span> : null}

            <h2>Post a Comment</h2>
            <form onSubmit={handleSubmit}>
                {isCommentPostedSuccessfully === null
                    ? null
                    : isCommentPostedSuccessfully === true
                        ? <p className="success">Comment was posted successfully.</p>
                        : <p className="error">Comment could not be posted.</p>}

                <textarea
                    id="input-comment"
                    name="input-comment"
                    value={commentInput}
                    onChange={onChangeCommentInput}
                    maxLength="300">
                </textarea>
                <button onClick={onClickSubmitCommentButton} disabled={commentInput.length === 0}>Submit Comment</button>
            </form>

            <h2>Comments ({comments.length})</h2>

            {areCommentsLoading ? <p>Loading comments...</p> : null}

            {comments.length === 0
                ? <p>No one has posted any comments yet. Be the first to share your thoughts on this post.</p>
                : null}

            <div id="comment-cards">
                {comments.map((comment) => {
                    return <CommentCard key={comment.comment_id} comment={comment} users={users} username={username}/>
                })}
            </div>
        </main>
    )
}