import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import PostCard from './PostCard';
import * as api from '../api';

export default function Home( {users, setUsers, posts, setPosts} ) {
    const { username, setUsername } = useContext( UserContext );
    const [ isPostsLoading, setIsPostsLoading ] = useState( true );
    const [ isPostsLoadedSuccessfully, setIsPostsLoadedSuccessfully ] = useState( null );
    const [ searchResults, setSearchResults ] = useState( [] );
    
    const navigate = useNavigate();
    useEffect(() => {
        if (!username) {
            navigate('/');
        }
    }, [])

    useEffect(() => {
        setIsPostsLoading(true);
        setIsPostsLoadedSuccessfully(null);
        api.getPosts()
            .then((response) => {
                setIsPostsLoading(false);
                setIsPostsLoadedSuccessfully(true);
                setPosts(response);
                setSearchResults(response);
            })
            .catch((error) => {
                console.log(error);
                setIsPostsLoading(false);
                setIsPostsLoadedSuccessfully(false);
            })
    }, [])

    useEffect(() => {
        api.getUsers()
        .then((response) => {
            setUsers(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <main>
            <h1>Welcome {username}!</h1>
            <p>View posts by other users below or <Link to="/create-a-post">create your own</Link>.</p>

            <SearchBar posts={posts} setSearchResults={setSearchResults}/>

            {searchResults.length === 0
                ? <p>No posts or users match your search.</p>
                : null}

            {isPostsLoading ? <p>Loading posts...</p> : null}

            {isPostsLoadedSuccessfully === null || isPostsLoadedSuccessfully === true
                ? null
                : <p className="error">Posts could not be loaded.</p>}

            <div id="post-cards">
                {searchResults.map((post) => {
                    return <PostCard key={post.post_id} post={post} users={users}/>
                })}
            </div>
        </main>
    )
}