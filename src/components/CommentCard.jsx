export default function CommentCard( {comment, users, username} ) {
    const userAccount = users.filter((user) => {
        return user.username === comment.owner;
    })

    return (
        <div className="comment-card">
            <img src={userAccount[0]?.profile_image_url} alt="image"></img>
            <div>{comment.owner}</div>            
            <div>{comment.body}</div>
            <div>{new Date(parseInt(comment.timestamp)).toLocaleString()}</div>
            {username === comment.owner ? <button>Delete Comment</button> : null}
        </div>
    )
}