import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { useNavigate } from 'react-router-dom';

export default function CreateAPost() {
    const { user, setUser } = useContext( UserContext );
    const [ postTextInput, setPostTextInput ] = useState( "" );
    console.log(user, "<-------- user");    
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [])

    function onChangePostTextInput(event) {
        setPostTextInput(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    function onClickCreateAPostButton() {
        console.log(postTextInput, "<-------- postTextInput")
    }

    function onChangeUploadFile(event) {
        console.log(event.target.value);
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

                <p>Upload an image:</p>
                <input type="file" id="filename" name="filename" onChange={onChangeUploadFile}></input>

                <br /><br />

                <button disabled={postTextInput.length === 0} onClick={onClickCreateAPostButton}>Share</button>
            </form>
        </main>
    )
}