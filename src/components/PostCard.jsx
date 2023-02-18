import { Link } from 'react-router-dom';

export default function PostCard( {post, users} ) {
    // console.log(post, "<------- post")
    // console.log(users, "<------- users")
    
    const userAccount = users.filter((user) => {
        return user.username === post.username;
    })
    // console.log(userAccount, "<-------- userAccount")

    return (
        <Link to={`/posts/${post.post_id}`} className="post-card">
            <div id="post-card-owner-profile-image-and-username">
                <Link to={`/profile/${post.username}`}>
                    <img id="post-card-owner-profile-image" src={userAccount[0]?.profile_image_url} alt="image"></img>
                </Link>                
                <Link to={`/profile/${post.username}`} id="post-card-owner-username">{post.username}</Link>
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