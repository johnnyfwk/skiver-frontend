import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import * as api from '../api';

export default function Index( {users, setUsers} ) {
    const { username, setUsername } = useContext( UserContext );
    const [ getUsernamesSuccessful, setGetUsernamesSuccessful ] = useState( null );
    const [ usernames, setUsernames ] = useState( [] );
    const [ registerUsernameInput, setRegisterUsernameInput ] = useState( "" );
    const [ registerPasswordInput, setRegisterPasswordInput ] = useState( "" );
    const [ registerProfileImageUrlInput, setRegisterProfileImageUrlInput ] = useState( "" );
    const [ logInUsernameInput, setLogInUsernameInput ] = useState( "" );
    const [ logInPasswordInput, setLogInPasswordInput ] = useState( "" );
    const [ isLogInPasswordCorrect, setIsLogInPasswordCorrect ] = useState( null );
    const [ isUsernameAvailable, setIsUsernameAvailable ] = useState( null );
    const [ usernameContainsOnlyLetters, setUsernameContainsOnlyLetters ] = useState( null );
    const [ isUsernameRegisteredSuccessfully, setIsUsernameRegisteredSuccessfully ] = useState( null );
    const [ userLoggedInSuccessfully, setUserLoggedInSuccessfully ] = useState( null );
    const [ isLogInFormVisible, setIsLogInFormVisible] = useState( true );
    const [ isProfileImageUrlInputValid, setIsProfileImageUrlInputValid ] = useState( null );

    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            navigate('/home');
        }
    }, [])

    useEffect(() => {
        setGetUsernamesSuccessful(null);
        api.getUsers()
            .then((response) => {
                setGetUsernamesSuccessful(true);
                setUsers(response);
                setUsernames(response.map((user) => {
                    return user.username;
                }))
            })
            .catch((error) => {
                console.log(error);
                setGetUsernamesSuccessful(false);
            })
    }, []);

    function onChangeRegisterUsernameInput(event) {
        setRegisterUsernameInput(event.target.value);
        setIsUsernameAvailable(null);
        setUsernameContainsOnlyLetters(null);        
        const containsOnlyletters = /^[a-zA-Z]+$/ig;
        const usernameInputContainsOnlyLetters = containsOnlyletters.test(event.target.value);
        if (getUsernamesSuccessful) {
            if (event.target.value) {
                if (usernames.includes(event.target.value.toLowerCase())) {
                    setIsUsernameAvailable(false);
                } else if (!usernameInputContainsOnlyLetters) {
                    setUsernameContainsOnlyLetters(false);
                } else {
                    setIsUsernameAvailable(true);
                    setUsernameContainsOnlyLetters(true);
                }
            } else {
                setIsUsernameAvailable(null);
                setUsernameContainsOnlyLetters(null)
            }
        }
    }

    function onChangeRegisterPasswordInput(event) {
        setRegisterPasswordInput(event.target.value);
    }

    function onChangeRegisterProfileImageUrlInput(event) {
        setRegisterProfileImageUrlInput(event.target.value);
        setIsProfileImageUrlInputValid(null);
    }

    function handleSubmitCreateAnAccount(event) {
        event.preventDefault();
        setIsUsernameRegisteredSuccessfully(null);
        setIsProfileImageUrlInputValid(null);   
        const registerUsernameInputAsLowercase = registerUsernameInput.toLowerCase();

        const isUrl = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
        if (isUrl.test(registerProfileImageUrlInput) || registerProfileImageUrlInput.length === 0) {
            setIsProfileImageUrlInputValid(true);
            api.registerUser(registerUsernameInputAsLowercase, registerPasswordInput, registerProfileImageUrlInput)
            .then((response) => {
                setUsername(registerUsernameInputAsLowercase);
                setIsUsernameRegisteredSuccessfully(true);
                navigate('/home');
            })
            .catch((error) => {
                console.log(error);
                setIsUsernameRegisteredSuccessfully(false);
            })
        } else {
            setIsProfileImageUrlInputValid(false);
        }
    }

    function onChangeLogInUsernameInput(event) {
        setUserLoggedInSuccessfully(null);
        setLogInUsernameInput(event.target.value);
    }

    function onChangeLogInPasswordInput(event) {
        setIsLogInPasswordCorrect(null)
        setLogInPasswordInput(event.target.value);
    }

    function handleSubmitLogIn(event) {
        event.preventDefault();
        setUserLoggedInSuccessfully(null);
        setIsLogInPasswordCorrect(null);
        const logInUsernameInputAsLowercase = logInUsernameInput.toLowerCase();
        if (usernames.includes(logInUsernameInputAsLowercase)) {
            const matchingUser = users.filter((user) => {
                return user.username === logInUsernameInputAsLowercase;
            })
            if (matchingUser[0].password === logInPasswordInput) {
                setUsername(logInUsernameInputAsLowercase);
                setIsLogInPasswordCorrect(true);
                setUserLoggedInSuccessfully(true);
                navigate('/home');
            } else {
                setIsLogInPasswordCorrect(false);
                setUserLoggedInSuccessfully(null);
            }
        } else {
            setUserLoggedInSuccessfully(false);
        }
    }

    function onClickSwitchToCreateAnAccountForm() {
        setIsLogInFormVisible(false);
    }

    function onClickSwitchToLogInForm(){
        setIsLogInFormVisible(true);
    }

    return (
        <main>
            <h1>Welcome to Skiver</h1>
            <p>A social media site where you can waste time by sharing your thoughts, what you had for dinner, or any other pointless events in your life with the rest of the world.</p>
            <strong>This is not a real social network but a personal project for a portfolio. However, feel free to create an account and browse the site, but we recommend not using a password you have for your other accounts as details are not securely stored on our database.</strong>

            {getUsernamesSuccessful ? null : <p className="error">Could not connect to the server. Please try again later.</p>}

            {isLogInFormVisible
                ? <form autoComplete="off" id="form-log-in" onSubmit={handleSubmitLogIn}>
                    <h2>Log In</h2>

                    <label htmlFor="log-in-username">Username:</label>
                    <input
                        autoComplete="off"
                        type="text"
                        id="log-in-username"
                        name="log-in-username"
                        value={logInUsernameInput}
                        onChange={onChangeLogInUsernameInput}
                        maxLength="20">
                    </input>

                    {userLoggedInSuccessfully === null || userLoggedInSuccessfully === true
                        ? null
                        : <span className="error">User does not exist.</span>}

                    <br /><br />

                    <label htmlFor="log-in-password">Password:</label>
                    <input
                        autoComplete="off"
                        type="password"
                        id="log-in-password"
                        name="log-in-password"
                        value={logInPasswordInput}
                        onChange={onChangeLogInPasswordInput}
                        maxLength="20">
                    </input>

                    {isLogInPasswordCorrect === null || isLogInPasswordCorrect === true
                        ? null
                        : <span className="error">Password is incorrect.</span>}

                    <br /><br />

                    <button disabled={logInUsernameInput.length === 0 || logInPasswordInput.length === 0 || !getUsernamesSuccessful}>Log In</button>

                    <p>Don't have an account? Sign up <span onClick={onClickSwitchToCreateAnAccountForm} className="switch-forms-link">here</span>.</p>
                </form>
                
                : <form autoComplete="off" id="form-create-an-account" onSubmit={handleSubmitCreateAnAccount}>
                    <h2>Create an Account</h2>
                    <label htmlFor="register-username">Enter a username:</label>
                    <input
                        autoComplete="off"
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
                            ? <span className="success">Available</span>
                            : <span className="error">Unavailable</span>}
                    
                    {usernameContainsOnlyLetters === null || usernameContainsOnlyLetters === true
                        ? null
                        : <span className="error">Usernames can only contain letters.</span>}

                    <br /><br />

                    <label htmlFor="register-password">Enter a password:</label>
                    <input
                        autoComplete="off"
                        type="password"
                        id="register-password"
                        name="register-password"
                        value={registerPasswordInput}
                        onChange={onChangeRegisterPasswordInput}
                        maxLength="20">
                    </input>

                    <br /><br />

                    <label htmlFor="register-profile-image">Enter a profile image URL (optional):</label>
                    <br />
                    <input
                        autoComplete="off"
                        type="text"
                        id="register-profile-image-url"
                        className="url-input"
                        name="register-profile-image-url"
                        value={registerProfileImageUrlInput}
                        onChange={onChangeRegisterProfileImageUrlInput}>
                    </input>

                    {isProfileImageUrlInputValid === null || isProfileImageUrlInputValid === true
                    ? null
                    : <span className="error">Please enter a valid URL.</span>}
                    
                    {isUsernameRegisteredSuccessfully === null || isUsernameRegisteredSuccessfully === true
                        ? null
                        : <p className="error">Account could not be created.</p>}
                    
                    <br /><br />

                    <button disabled={!isUsernameAvailable || !usernameContainsOnlyLetters || !getUsernamesSuccessful || registerPasswordInput.length === 0}>Create Account</button>

                    <p>Already have an account? Log in <span onClick={onClickSwitchToLogInForm} className="switch-forms-link">here</span>.</p>
                </form>}
        </main>
    )
}