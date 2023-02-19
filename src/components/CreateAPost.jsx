import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';

export default function CreateAPost() {
    const { username, setUsername } = useContext( UserContext );
    const [ postTextInput, setPostTextInput ] = useState( "" );
    const [ imageUrlInput, setImageUrlInput ] = useState( "" );
    const [ isImageURlInputValid, setIsImageURlInputValid ] = useState( null );
    const [ isPostSubmittedSuccessfully, setIsPostSubmittedSuccessfully ] = useState( null );

    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            navigate('/');
        }
    }, [])

    function onChangePostTextInput(event) {
        setPostTextInput(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    function onChangeImageUrlInput(event) {
        setImageUrlInput(event.target.value);
        setIsImageURlInputValid(null);
    }

    function onClickCreateAPostButton() {
        setIsImageURlInputValid(null);
        setIsPostSubmittedSuccessfully(null);
        const isUrl = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
        if (isUrl.test(imageUrlInput) || imageUrlInput.length === 0) {
            setIsImageURlInputValid(true);
            api.createAPost(username, postTextInput, 0, imageUrlInput, Date.now())
                .then((response) => {
                    setIsPostSubmittedSuccessfully(true);
                    setTimeout(() => {
                        navigate('/home');
                    }, 3000)
                })
                .catch((error) => {
                    console.log();
                    setIsPostSubmittedSuccessfully(false);
                    setTimeout(() => {
                        setIsPostSubmittedSuccessfully(null);
                    }, 3000)
                })
        } else {
            setIsImageURlInputValid(false);
        }
    }

    return (
        <main>
            <h1>Create a Post</h1>

            <p>What do you want to share with the world?</p>
            <form id="form-create-a-post" onSubmit={handleSubmit}>
                <textarea
                    id="input-create-a-post-text"
                    name="input-create-a-post-text"
                    value={postTextInput}
                    onChange={onChangePostTextInput}
                    maxLength="300">
                </textarea>
                <div>Characters: {postTextInput.length}/300</div>


                <p>Enter image URL (optional):</p>
                <input
                    type="text"
                    id="create-a-post-image-url"
                    className="url-input"
                    name="create-a-post-image-url"
                    value={imageUrlInput}
                    onChange={onChangeImageUrlInput}>
                </input>
                {isImageURlInputValid === null || isImageURlInputValid === true
                    ? null
                    : <span className="error">Please enter a valid URL.</span>}

                <br /><br />

                {isPostSubmittedSuccessfully === null
                    ? null
                    : isPostSubmittedSuccessfully === true
                        ? <p className="success">Post is being created.</p>
                        : <p className="error">Post could not be created.</p>}

                <button disabled={postTextInput.length === 0} onClick={onClickCreateAPostButton}>Create Post</button>
            </form>
        </main>
    )
}