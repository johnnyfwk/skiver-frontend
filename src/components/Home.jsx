import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { useNavigate, Link } from 'react-router-dom';
import Search from './Search';
import PostCard from './PostCard';
import * as api from '../api';

export default function Home( {users, setUsers, posts, setPosts} ) {
    const { username, setUsername } = useContext( UserContext );
    
    const navigate = useNavigate();
    useEffect(() => {
        if (!username) {
            navigate('/');
        }
    }, [])

    useEffect(() => {
        api.getPosts()
            .then((response) => {
                setPosts(response);
            })
            .catch((error) => {
                console.log(error);
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

    console.log(users, "<------- users");

    return (
        <main>
            <h1>Welcome {username}!</h1>
            <p>View posts by other users below or <Link to="/create-a-post">create your own</Link>.</p>

            <Search />

            <div id="post-cards">
                {posts.map((post) => {
                    return <PostCard key={post.post_id} post={post} users={users}/>
                })}
            </div>
        </main>
    )
}