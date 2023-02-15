import { useState } from 'react';

export default function Search() {
    const [ searchInput, setSearchInput ] = useState( "" );

    function onChangeSearchInput(event) {
        setSearchInput(event.target.value);
    }

    return (
        <input
            type="text"
            id="search"
            name="search"
            value={searchInput}
            onChange={onChangeSearchInput}
            maxLength="30"
            placeholder="Search Posts">
        </input>
    )
}