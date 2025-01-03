import {useState } from "react";

export interface ISearchTemplate {
    textProp : string;
}

export interface ResponseData {
    data: string;
}


const Search: React.FC = () => {
    const [username, setUserName] = useState<string>('');

    const handleClick = ()  => {
        console.log(username);
    }

    return <>
        <div className="search-bar ">
            <input onChange={(e) => setUserName(e.target.value)} type="text" name="name" value={username} />
            <button onClick={handleClick} type="button" id="submitBtn">Submit </button>
        </div>
    </>
}

export default Search;