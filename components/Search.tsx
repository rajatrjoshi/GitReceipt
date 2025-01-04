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
        <div className="">
            <div className="flex items-center gap-2 max-w-md mx-auto">
                <input className="flex-1 px-4 py-2 rounded-lg bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-[16px]" onChange={(e) => setUserName(e.target.value)} type="text" name="name" value={username} placeholder="Enter Github Username"/>
                <div className="px-4 sm:px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base">
                    <button onClick={handleClick} type="button" id="submitBtn">Generate </button>
                </div>
            </div>
        </div>
    </>
}

export default Search;