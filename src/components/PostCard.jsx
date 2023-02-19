import { Link } from 'react-router-dom';

export default function PostCard( {post, users} ) {    
    const userAccount = users.filter((user) => {
        return user.username === post.username;
    })

    return (
        <Link to={`/posts/${post.post_id}`} className="post-card">
            <div id="post-card-owner-profile-image-and-username">
                <img id="post-card-owner-profile-image" src={userAccount[0]?.profile_image_url} alt="image"></img>          
                <div id="post-card-owner-username">{post.username}</div>
            </div>

            <div id="post-card-body">
                <div id="post-card-body-text">{post.body}</div>
                {post.image_url ? <img id="post-card-body-image" src={post.image_url} alt="image"></img> : null}
            </div>

            <div id="post-card-likes-and-timestamp">
                <div id="post-card-timestamp">{new Date(parseInt(post.timestamp)).toLocaleString()}</div>
                <div id="post-card-likes">&#x2665; {post.likes}</div>
            </div>
        </Link>
    )
}