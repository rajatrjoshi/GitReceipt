import {useState } from "react";

export interface ISearchTemplate {
    textProp : string;
}

export interface ResponseData {
    data: string;
}

// https://api.github.com/search/commits?q=author:rajatrjoshi+committer-date:%3E=2024-12-05
// https://api.github.com/users/rajatrjoshi/repos?per_page=100&sort=pushed
const Search: React.FC = () => {
    const [username, setUserName] = useState<string>('');
    const [userData, setUserData] = useState([]);

    const handleClick =  async ()  => {

        const response = await fetch(`https://api.github.com/users/${username}`);
        setUserData(await response.json());

        console.log(userData);
    }

    return <>
        <div className="search-bar ">
            <input onChange={(e) => setUserName(e.target.value)} type="text" name="name" value={username} placeholder="Enter Github Username"/>
            <button onClick={handleClick} type="button" id="submitBtn">Generate </button>
        </div>
    </>
}

export default Search;