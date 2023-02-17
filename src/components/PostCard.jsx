import { Link } from 'react-router-dom';

export default function PostCard( {post, users, username} ) {
    const userAccount = users.filter((user) => {
        return user.username === post.username;
    })

    return (
        <Link to={`/posts/${post.post_id}`} className="post-card">
            <img src={userAccount[0]?.profile_image_url} alt="image"></img>
            <div>{post.username}</div>
            <div>{post.body}</div>
            {post.image_url ? <img src={post.image_url} alt="image"></img> : null}            
            <div>&#x2665; {post.likes}</div>
            <div>{new Date(parseInt(post.timestamp)).toLocaleString()}</div>
            
        </Link>
    )
}