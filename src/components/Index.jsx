import { useState, useEffect } from 'react';
import * as api from '../api';

export default function Index() {
    const [ registerUsernameInput, setRegisterUsernameInput ] = useState( "" );
    const [ usernames, setUsernames ] = useState( [] );
    const [ isUsernameAvailable, setIsUsernameAvailable ] = useState( null );
    const [ usernameContainOnlyLetters, setUsernameContainOnlyLetters ] = useState( null );
    const [ getUsernamesSuccessful, setGetUsernamesSuccessful ] = useState( null );

    useEffect(() => {
        setGetUsernamesSuccessful(null);
        api.getUsers()
            .then((response) => {
                setGetUsernamesSuccessful(true);
                const updateUsernames = response.map((username) => {
                    return username.username;
                })
                setUsernames(updateUsernames);
            })
            .catch((error) => {
                console.log(error);
                setGetUsernamesSuccessful(false);
            })
    }, []);

    function onChangeRegisterUsernameInput(event) {
        setRegisterUsernameInput(event.target.value);
        setIsUsernameAvailable(null);
        setUsernameContainOnlyLetters(null);        
        const containsOnlyletters = /^[a-zA-Z]+$/ig;
        const usernameInputContainsOnlyLetters = containsOnlyletters.test(event.target.value);
        if (event.target.value) {
            if (usernames.includes(event.target.value.toLowerCase())) {
                setIsUsernameAvailable(false);
            } else if (!usernameInputContainsOnlyLetters) {
                setUsernameContainOnlyLetters(false);
            } else {
                setIsUsernameAvailable(true);
                setUsernameContainOnlyLetters(true);
            }
        } else {
            setIsUsernameAvailable(null);
            setUsernameContainOnlyLetters(null)
        }
    }

    return (
        <main>
            <h1>Welcome to Skiver</h1>
            <p>A social media site where you can post and share micro messages.</p>

            <form id="form-create-an-account">
                <h2>Create an Account</h2>

                <label htmlFor="register-username">Enter a username: </label>
                <input
                    type="text"
                    id="register-username"
                    name="register-username"
                    value={registerUsernameInput}
                    onChange={onChangeRegisterUsernameInput}
                    maxLength="20">
                </input>

                {isUsernameAvailable === null
                    ? null
                    : isUsernameAvailable
                        ? <span>Available</span>
                        : <span>Unavailable</span>}
                
                {usernameContainOnlyLetters === null || usernameContainOnlyLetters === true
                    ? null
                    : <span>Usernames can only contain letters.</span>}
                {/* <br /> */}
                <button disabled={!isUsernameAvailable || !usernameContainOnlyLetters}>Create My Account</button>
            </form>
        </main>
    )
}