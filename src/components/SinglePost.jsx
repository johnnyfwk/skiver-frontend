import { UserContext } from '../contexts/User';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../api';

export default function SinglePost() {
    const { username, setUsername } = useContext( UserContext );
    const { post_id } = useParams();
    const [ post, setPost ] = useState( {} );
    const [ postOwner, setPostOwner ] = useState( {} );
    const [ commentInput, setCommentInput ] = useState( "" );

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
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
    }

    function onChangeCommentInput(event) {
        setCommentInput(event.target.value);
    }

    function onClickSubmitCommentButton() {
        console.log(commentInput, "<------ commentInput");
    }

    return (
        <main id="single-post">
            <h1>Single Post</h1>
            <img src={postOwner[0]?.profile_image_url}></img>
            <p>{post[0]?.username}</p>
            <p>{post[0]?.body}</p>
            {post[0]?.image_url ? <img src={post[0]?.image_url}></img> : null}            
            <p>Likes: {post[0]?.likes}</p>
            <p>{new Date(parseInt(post[0]?.timestamp)).toLocaleString()}</p>

            <h2>Post a Comment</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="comment">Leave a comment for this post:</label>
                <textarea
                    id="input-comment"
                    name="input-comment"
                    value={commentInput}
                    onChange={onChangeCommentInput}
                    maxLength="300">
                </textarea>
                <button onClick={onClickSubmitCommentButton} disabled={commentInput.length === 0}>Submit Comment</button>
            </form>

            <h2>Comments</h2>
        </main>
    )
}