import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as api from '../api';
import PostCard from './PostCard';
import CommentCard from './CommentCard';

export default function Profile( {users, setUsers, posts, setPosts} ) {
    const { username, setUsername } = useContext( UserContext );
    const { user } = useParams();

    const [ usersProfile, setUsersProfile ] = useState( [] );
    const [ usersPosts, setUsersPosts ] = useState( [] );
    const [ usersComments, setUsersComments ] = useState( [] );
    const [ isUsersLoadedSuccessfully, setIsUsersLoadedSuccessfully ] = useState( null );
    const [ isPostsByUsernameLoadedSuccessfully, setIsPostsByUsernameLoadedSuccessfully ] = useState( null );
    const [ isCommentsLoadedSuccessfully, setIsCommentsLoadedSuccessfully ] = useState( null );
    const [ isUsersLoading, setIsUsersLoading ] = useState( true );
    const [ isPostsByUsernameLoading, setIsPostsByUsernameLoading ] = useState( true );
    const [ isCommentsLoading, setIsCommentsLoading ] = useState( true );
    const [ visibleTab, setVisibleTab ] = useState( "posts" );
    const [ isEditProfileImageButtonVisible, setIsEditProfileImageButtonVisible ] = useState( true );
    const [ isCancelEditProfileImageButtonVisible, setIsCancelEditProfileImageButtonVisible ] = useState( false );
    const [ isUpdateProfileImageButtonVisible, setIsUpdateProfileImageButtonVisible ] = useState( false );
    const [ editProfileImageUrlInput, setEditProfileImageUrlInput ] = useState( "" );
    const [ isEditProfileSuccessful, setIsEditProfileSuccessful ] = useState( null );
    const [ isImageUrlValid, setIsImageUrlValid ] = useState( true );
    const [ isDeleteAccountButtonVisible, setIsDeleteAccountButtonVisible ] = useState( true );
    const [ isDeleteAccountConfirmationMessageVisible, setIsDeleteAccountConfirmationMessageVisible ] = useState( false );
    const [ isUserHasNotCreatedAnyPostsMessageVisible, setIsUserHasNotCreatedAnyPostsMessageVisible ] = useState( false );
    const [ isUserHasNotCommentedOnAnyPostsMessageVisible, setIsUserHasNotCommentedOnAnyPostsMessageVisible ] = useState( false );
    const [ isUserDeletedSuccessfully, setIsUserDeletedSuccessfully ] = useState( null );
    const [ isCommentEditedSuccessfully, setIsCommentEditedSuccessfully ] = useState( null );
    const [ isCommentDeletedSuccessfully, setIsCommentDeletedSuccessfully ] = useState( null );

    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            navigate('/');
        }
    }, [])

    useEffect(() => {
        setIsUsersLoading(true);
        setIsUsersLoadedSuccessfully(null);
        api.getUsers()
            .then((response) => {
                setIsUsersLoadedSuccessfully(true);
                setIsUsersLoading(false);
                setUsersProfile(response.filter((element) => {
                    if (element.username === user) {
                        setEditProfileImageUrlInput(element.profile_image_url);
                    }
                    return element.username === user;
                }))
                setUsers(response);
            }).catch((error) => {
                console.log(error);
                setIsUsersLoadedSuccessfully(false);
                setIsUsersLoading(false);
            })
    }, [user, isEditProfileSuccessful, isUserDeletedSuccessfully])

    useEffect(() => {
        api.getPosts()
            .then((response) => {
                setPosts(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [user])

    useEffect(() => {
        setIsPostsByUsernameLoadedSuccessfully(null);
        setIsPostsByUsernameLoading(true);
        setIsUserHasNotCreatedAnyPostsMessageVisible(false);
        api.getPostsByUsername(user)
            .then((response) => {
                setIsPostsByUsernameLoadedSuccessfully(true);
                setIsPostsByUsernameLoading(false);
                setUsersPosts(response);
                if (response.length === 0) {
                    setIsUserHasNotCreatedAnyPostsMessageVisible(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsPostsByUsernameLoadedSuccessfully(false);             
                setIsPostsByUsernameLoading(false);
            })
    }, [user])

    useEffect(() => {
        setIsCommentsLoadedSuccessfully(null);
        setIsCommentsLoading(true);
        setIsUserHasNotCommentedOnAnyPostsMessageVisible(false);
        api.getCommentsByUsername(user)
            .then((response) => {
                setIsCommentsLoadedSuccessfully(true);
                setIsCommentsLoading(false);
                setUsersComments(response);
                if (response.length === 0) {
                    setIsUserHasNotCommentedOnAnyPostsMessageVisible(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsCommentsLoadedSuccessfully(false);
                setIsCommentsLoading(false);
            })
    }, [user, isCommentEditedSuccessfully, isCommentDeletedSuccessfully])

    function onClickPostsTab() {
        setVisibleTab("posts");
    }

    function onClickCommentsTab() {
        setVisibleTab("comments");
    }

    function onClickEditProfileImageButton() {
        setIsEditProfileImageButtonVisible(false);
        setIsCancelEditProfileImageButtonVisible(true);
        setIsUpdateProfileImageButtonVisible(true);
        setIsDeleteAccountButtonVisible(false);
    }

    function onClickCancelEditProfileImageButton() {
        setIsEditProfileImageButtonVisible(true);
        setIsCancelEditProfileImageButtonVisible(false);
        setIsUpdateProfileImageButtonVisible(false);
        setEditProfileImageUrlInput(usersProfile[0].profile_image_url);
        setIsDeleteAccountButtonVisible(true);
    }

    function updateProfileImage(username, profileImageUrl) {
        api.editUserByUsername(username, profileImageUrl)
                .then(() => {
                    setIsEditProfileSuccessful(true);
                    setTimeout(() => {
                        setIsEditProfileSuccessful(null);
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error);
                    setIsEditProfileSuccessful(false);
                    setTimeout(() => {
                        setIsEditProfileSuccessful(null);
                    }, 3000);
                })
    }

    function onClickUpdateProfileImageButton() {
        setIsImageUrlValid(true);
        setIsEditProfileSuccessful(null);
        const isImageUrl = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
        if (isImageUrl.test(editProfileImageUrlInput)) {
            setIsUpdateProfileImageButtonVisible(false);
            setIsCancelEditProfileImageButtonVisible(false);
            setIsEditProfileImageButtonVisible(true);
            updateProfileImage(username, editProfileImageUrlInput);
            setIsDeleteAccountButtonVisible(true);
        } else if (editProfileImageUrlInput.length === 0) {
            setIsUpdateProfileImageButtonVisible(false);
            setIsCancelEditProfileImageButtonVisible(false);
            setIsEditProfileImageButtonVisible(true);
            updateProfileImage(username, "https://skiver.co.uk/assets/images/avatars/avatar_image.png");
            setIsDeleteAccountButtonVisible(true);
        } else {
            setIsImageUrlValid(false);
            setTimeout(() => {
                setIsImageUrlValid(true);
            }, 3000);
        }
    }

    function onChangeEditProfileImageUrlInput(event) {
        setEditProfileImageUrlInput(event.target.value);
    }

    function onClickDeleteAccountButton() {
        setIsDeleteAccountButtonVisible(false);
        setIsEditProfileImageButtonVisible(false);
        setIsDeleteAccountConfirmationMessageVisible(true);
    }

    function onClickCancelDeleteAccountButton() {
        setIsDeleteAccountConfirmationMessageVisible(false);
        setIsDeleteAccountButtonVisible(true);
        setIsEditProfileImageButtonVisible(true);
    }

    function onClickConfirmDeleteAccountButton() {
        setIsUserDeletedSuccessfully(null);
        if (usersPosts) {
            usersPosts.forEach((post) => {
                api.deleteAllCommentsByPostId(post.post_id)
                    .then((response) => {
                        console.log(response);
                    })
            })
            api.deleteAllCommentsByUsername(username)
                .then(() => {
                    api.deleteAllPostsByUsername(username)
                })            
                .then(() => {
                    api.deleteUserByUsername(username)
                })
                .then(() => {
                    setIsUserDeletedSuccessfully(true);
                    setIsDeleteAccountConfirmationMessageVisible(false);
                    setIsDeleteAccountButtonVisible(true);
                    setIsEditProfileImageButtonVisible(true);
                    setTimeout(() => {
                        setUsername("");
                        navigate('/');         
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error);
                    setIsUserDeletedSuccessfully(false);
                    setIsDeleteAccountConfirmationMessageVisible(false);
                    setIsDeleteAccountButtonVisible(true);
                    setIsEditProfileImageButtonVisible(true);
                    setTimeout(() => {
                        setIsUserDeletedSuccessfully(null);
                    }, 3000)
                })
        }
    }

    const styleProfilePostsTabs = {
        background: visibleTab === "posts" ? "#000000" : "#ffffff",
        color: visibleTab === "posts" ? "#ffffff" : "#000000"
    }

    const styleProfileCommentsTabs = {
        background: visibleTab === "comments" ? "#000000" : "#ffffff",
        color: visibleTab === "comments" ? "#ffffff" : "#000000"
    }
    
    return (
        <main id="profile">
            <h1>{user}</h1>

            {isUsersLoading ? <p>Loading user's profile...</p> : null}

            {isUsersLoadedSuccessfully === null || isUsersLoadedSuccessfully === true
                ? null
                : <p className="error">User's profile could not loaded.</p>}

            <img id="profile-image" src={usersProfile[0]?.profile_image_url} alt={usersProfile[0]?.profile_image_url}/>

            <br />

            {isImageUrlValid ? null : <p className="error">Please enter a valid image URL.</p>}

            {isEditProfileSuccessful === null
                ? null
                : isEditProfileSuccessful === true
                    ? <p className="success">Profile image has been updated</p>
                    : <p className="error">Profile image could not be updated.</p>}

            {username === user && isCancelEditProfileImageButtonVisible
                ? <input
                    type="text"
                    id="edit-profile-image-url-input"
                    className="url-input"
                    name="edit-profile-image-url-input"
                    value={editProfileImageUrlInput}
                    onChange={onChangeEditProfileImageUrlInput}
                    placeholder="Leave blank for default avatar">
                  </input>
                : null}

            <br />

            <div id="profile-edit-and-delete-buttons">
                {username === user && isEditProfileImageButtonVisible
                    ? <button onClick={onClickEditProfileImageButton}>Edit Profile Image</button>
                    : null}

                {username === user && isCancelEditProfileImageButtonVisible
                    ? <button onClick={onClickCancelEditProfileImageButton}>Cancel Editing</button>
                    : null}
                
                {username === user && isUpdateProfileImageButtonVisible
                    ? <button onClick={onClickUpdateProfileImageButton}>Update Image</button>
                    : null}

                {username === user && isDeleteAccountButtonVisible
                    ? <button onClick={onClickDeleteAccountButton}>Delete Account</button>
                    : null}
            </div>
            

            {username === user && isDeleteAccountConfirmationMessageVisible
                ? <div>
                    <p className="error">Are you sure you want to delete your account? If you made any posts or comments, they will be lost.</p>
                    <div id="profile-delete-account-confirmation-buttons">
                        <button onClick={onClickConfirmDeleteAccountButton}>Delete</button>
                        <button onClick={onClickCancelDeleteAccountButton}>Cancel</button>
                    </div>
                  </div>
                : null}

            {isUserDeletedSuccessfully === null
                ? null
                : isUserDeletedSuccessfully === true
                    ? <p className="success">Account has been successfully deleted. Redirecting you back to the homepage.</p>
                    : <p className="error">Account could not be deleted.</p>}

            <br /><br />

            <div id="profile-tabs">
                <div onClick={onClickPostsTab} style={styleProfilePostsTabs} disabled={visibleTab === "posts"}>Posts</div>
                <div onClick={onClickCommentsTab} style={styleProfileCommentsTabs}  disabled={visibleTab === "comments"}>Comments</div>
            </div>

            {visibleTab === "posts"
                ? <div id="profile-posts">
                    {isPostsByUsernameLoading ? <p>Loading user's posts...</p> : null}

                    {isPostsByUsernameLoadedSuccessfully === null || isPostsByUsernameLoadedSuccessfully === true
                        ? null
                        : <p className="error">User's posts could not loaded.</p>}

                    {isUserHasNotCreatedAnyPostsMessageVisible
                        ? <p>No posts created yet.</p>
                        : null}

                    <div id="post-cards">
                        {usersPosts.map((post) => {
                            return <PostCard key={post.post_id} post={post} users={users}/>
                        })}
                    </div>
                  </div>
                : <div id="profile-comments">
                    {isCommentsLoading ? <p>Loading user's comments...</p> : null}

                    {isCommentsLoadedSuccessfully === null || isCommentsLoadedSuccessfully === true
                        ? null
                        : <p className="error">User's comments could not loaded.</p>}

                    {isUserHasNotCommentedOnAnyPostsMessageVisible
                        ? <p>No comments made on any posts yet.</p>
                        : null}

                    <div id="comment-cards">
                        {usersComments.map((comment) => {
                            const commentsPost = posts.filter((post) => {
                                return post.post_id === comment.post_id;
                            })
                            return <div key={comment.comment_id} id="profile-comments-post-link-and-comment-card">
                                <Link to={`/posts/${commentsPost[0].post_id}`} id="profile-comments-post-link">{commentsPost[0].body}</Link>
                                <CommentCard
                                    key={comment.comment_id}
                                    comment={comment}
                                    users={users}
                                    username={username}
                                    isCommentEditedSuccessfully={isCommentEditedSuccessfully}
                                    setIsCommentEditedSuccessfully={setIsCommentEditedSuccessfully}
                                    isCommentDeletedSuccessfully={isCommentDeletedSuccessfully}
                                    setIsCommentDeletedSuccessfully={setIsCommentDeletedSuccessfully}
                                />
                            </div>
                        })}
                    </div>
                  </div>}

                <Link to="/create-a-post" id="create-post-button" title="Create Post">+</Link>
        </main>
    )
}