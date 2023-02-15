export default function PostCard( {post, users} ) {
    console.log(post, "<------ post")
    const userAccount = users.filter((user) => {
        return user.username === post.username;
    })

    return (
        <div className="post-card">
            <img src={userAccount[0]?.profile_image_url} alt="image"></img>
            <div>{post.username}</div>
            <div>{post.body}</div>
            <img src={post.image_url} alt="image"></img>
            <div>Likes: {post.likes}</div>
            <div>{new Date(parseInt(post.timestamp)).toLocaleString()}</div>
        </div>
    )
}