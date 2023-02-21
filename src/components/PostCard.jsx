import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';

export default function PostCard( {post, users} ) {
    const [ commentByPostId, setCommentByPostId ] = useState( [] );

    const userAccount = users.filter((user) => {
        return user.username === post.username;
    })

    useEffect(() => {
        api.getCommentsByPostId(post.post_id)
        .then((response) => {
            setCommentByPostId(response);
        })
    }, [])


    return (
        <Link to={`/posts/${post.post_id}`} className="post-card" loading="lazy">
            <div id="post-card-owner-profile-image-and-username">
                <img id="post-card-owner-profile-image" src={userAccount[0]?.profile_image_url} alt="image"></img>          
                <div id="post-card-owner-username">{post.username}</div>
            </div>

            <div id="post-card-body">
                <p id="post-card-body-text">{post.body}</p>
                {post.image_url ? <img id="post-card-body-image" src={post.image_url} alt="image"></img> : null}
            </div>

            <div id="post-card-likes-and-timestamp">
                <div id="post-card-timestamp">{new Date(parseInt(post.timestamp)).toLocaleString().replace(",", " ")}</div>
                <div id="post-card-likes"><span id="heart">&#x2665;</span> {post.likes}</div>
                <div>&#128488; {commentByPostId.length}</div>
            </div>
        </Link>
    )
}