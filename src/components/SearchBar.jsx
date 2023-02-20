import { useState } from 'react';

export default function SearchBar( {posts, setSearchResults} ) {
    const [ searchInput, setSearchInput ] = useState( "" );

    function onChangeSearchInput(event) {
        setSearchInput(event.target.value);
        const searchMatches = posts.filter((post) => {
            return post.body.toLowerCase().includes(event.target.value.toLowerCase()) || post.username.includes(event.target.value.toLowerCase());
        })
        setSearchResults(searchMatches);
    }

    return (
        <input
            type="text"
            id="search-bar"
            name="search-bar"
            value={searchInput}
            onChange={onChangeSearchInput}
            maxLength="50"
            placeholder="Search posts and users">
        </input>
    )
}