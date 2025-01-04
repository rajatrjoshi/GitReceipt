import {useState } from "react";

export interface ISearchTemplate {
    textProp : string;
}

export interface ResponseData {
    data: string;
}


const Search: React.FC = () => {
    const [username, setUserName] = useState<string>('');
    const [userData, setUserData] = useState([]);
    const [repoData, setRepoData] = useState([]);
    const [commitData, setCommitData] = useState([]);
    const [toggle, setToggle] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleClick =  async ()  => {

        setToggle(true);
        setLoading(true);

        const response = await fetch(`https://api.github.com/users/${username}`);
        setUserData(await response.json());

        const commitResponse = await fetch(`https://api.github.com/search/commits?q=author:${username}+committer-date:%3E=2024-12-05`);
        setCommitData(await commitResponse.json());

        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`);
        setRepoData(await repoResponse.json());

        setLoading(false);
    }

    return <>
        <div className="">
            <div className="flex items-center gap-2 max-w-md mx-auto">
                <input className="flex-1 px-4 py-2 rounded-lg bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-[16px]" onChange={(e) => setUserName(e.target.value)} type="text" name="name" value={username} placeholder="Enter Github Username"/>
                <div className="px-4 sm:px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base">
                    <button onClick={handleClick} type="button" id="submitBtn">Generate</button>
                </div>
            </div>

            {isLoading && (
                <> 
                    <div>Loading......</div>
                </>
            )}

            {!isLoading && toggle && (
                <> 
                    <div>UserData</div>
                </>
            )}

        </div>
    </>
}

export default Search;