import { useState } from 'react';

export default function SearchBar( {posts, setSearchResults} ) {
    const [ searchInput, setSearchInput ] = useState( "" );

    function onChangeSearchInput(event) {
        setSearchInput(event.target.value);
        const searchMatches = posts.filter((post) => {
            return post.body.includes(event.target.value) || post.username.includes(event.target.value);
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