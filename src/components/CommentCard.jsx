import { useState } from 'react';

export default function CommentCard( {comment, users, username} ) {
    const [ isDeleteCommentConfirmationMessageVisible, setIsDeleteCommentConfirmationMessageVisible] = useState( false );

    const userAccount = users.filter((user) => {
        return user.username === comment.owner;
    })

    return (
        <div className="comment-card">
            <div id="comment-card-info">
                <img id="comment-card-owner-profile-image" src={userAccount[0]?.profile_image_url} alt="image"></img>
                <div id="comment-card-owner-username">{comment.owner}</div>
                <div id="comment-card-timestamp">{new Date(parseInt(comment.timestamp)).toLocaleString()}</div>   
            </div>

            <div id="comment-card-body">
                <div id="comment-card-body-text">{comment.body}</div>
            </div>          

            {username === comment.owner
                ? <div id="comment-card-edit-and-delete-buttons">
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                : null}
        </div>
    )
}