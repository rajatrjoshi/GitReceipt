import {useEffect, useRef, useState } from "react";
import JsBarcode from 'jsbarcode';

export interface ISearchTemplate {
    textProp : string;
}

export interface ResponseData {
    data: string;
}

interface BarcodeLinkProps {
    link: string;  // link prop should be a string
  }
  
interface Repo {
    id:number;
    stargazers_count: number;
    name: string;
    forks_count:number;
    language:string;
}

interface User {
    name: string;
    login: string;
    id: number
    node_id: string;
    public_repos: number;
    followers: number;
    following: number;
}

interface Commit {
    total_count: number;
}

const BarcodeLink: React.FC<BarcodeLinkProps>= ({link}) => {
    const barcodeRef = useRef(null);
  
    useEffect(() => {
      // Generate the barcode when the component mounts or when the `link` changes
      if (barcodeRef.current) {
        JsBarcode(barcodeRef.current, link, {
            format:"CODE128",
            width:0.75,
            height:20,
            lineColor:"#000000",
            displayValue:true,
            fontSize:10,
            background:"#fff"
        });
      }
    }, [link]);

    return <svg ref={barcodeRef}></svg>; 
};



const Search: React.FC = () => {
    const [username, setUserName] = useState<string>('');
    const [userData, setUserData] = useState<User>();
    const [repoData, setRepoData] = useState<Repo[]>([]);
    const [commitData, setCommitData] = useState<Commit>();
    const [toggle, setToggle] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [disableBtn, setDisableBtn] = useState<boolean>(true);

    const handleClick =  async ()  => {

        setDisableBtn(true);
        setToggle(true);
        setLoading(true);

        const response = await fetch(`https://api.github.com/users/${username}`);
        setUserData(await response.json());

        const commitResponse = await fetch(`https://api.github.com/search/commits?q=author:${username}+committer-date:%3E=2024-12-05`);
        setCommitData(await commitResponse.json());

        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`);
        setRepoData(await repoResponse.json());

        setLoading(false);
        setDisableBtn(false);
    };

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const hours = today.getHours();   // Get the hours (24-hour format)
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const billing_time = `${formattedHours}:${formattedMinutes}:${formattedSeconds}  ${ampm}`;

    const stars_earned = repoData
        .map(repo => repo?.stargazers_count)
        .reduce((acc, stargazers_count) => acc + stargazers_count, 0);

    const repo_forks = repoData
    .map(repo => repo?.forks_count)
    .reduce((acc, forks_count) => acc + forks_count, 0);

        
    const top_languages = [...new Set(repoData.map(repo => repo?.language))];
    const link = `https://github.com/${username}`;

    return <>
        <div className="">
            <div className="flex items-center gap-2 max-w-md mx-auto">
                <input onChangeCapture={()=>setDisableBtn(false)} className="flex-1 px-4 py-2 rounded-lg bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-[16px]" onChange={(e) => setUserName(e.target.value)} type="text" name="name" value={username} placeholder="Enter Github Username"/>
                    <button type="submit" onClick={handleClick} id="submitBtn" disabled={disableBtn} className="px-4 sm:px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base">Generate</button>
            </div>

            <div className="pt-7 flex items-center justify-center">
                {isLoading && (
                    <> 
                        <div>Loading......</div>
                    </>
                )}

                {!isLoading && toggle && (
                    <> 
                        <div className="p-4 receipt max-w-[88mm] w-full bg-white text-black flex flex-col justify-center p-1 text-center p-2">
                            <div className="receipt-header mb-6">
                                <div className="font-semibold text-lg">
                                    GITHUB RECEIPT
                                </div>
                                
                                <div className="p-1 uppercase text-xs">
                                    {formattedDate}
                                </div>
                                
                                <div className="text-xs mt-1 opacity-75">
                                    ORDER #{userData?.id}
                                </div>
                            </div>
                            <div className="customer-details p-2 flex flex-col items-baseline justify-start text-xs mb-4">
                                <div>
                                    CUSTOMER: {userData?.name}
                                </div>
                                <div>
                                    @{userData?.login}
                                </div>
                            </div>

                            <div className="border-t border-b border-dashed py-3 mb-4">
                                <table className="w-full text-xs">
                                    <tbody>
                                        <tr>
                                            <td className="text-left">REPOSITORIES</td>
                                            <td className="text-right">{userData?.public_repos}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-left">STARS EARNED</td>
                                            <td className="text-right">{stars_earned}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-left">REPO FORKS</td>
                                            <td className="text-right">{repo_forks}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-left">FOLLOWERS</td>
                                            <td className="text-right">{userData?.followers}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-left">FOLLOWING</td>
                                            <td className="text-right">{userData?.following}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="py-3 text-xs flex flex-col items-baseline justify-start mb-4">
                                <div>
                                    TOP LANGUAGES:
                                </div>
                                <div className="text-left">
                                    {top_languages.join(', ')}
                                </div>
                            </div>

                            <div className="border-t border-b border-dashed mb-4 text-xs">
                                <table className="w-full mb-4">
                                    <tbody>
                                        <tr>
                                            <td className="text-left">MOST ACTIVE DAY:</td>
                                            <td className="text-right">00</td>
                                        </tr>

                                        <tr>
                                            <td className="text-left">COMMITS (30d):</td>
                                            <td className="text-right">{commitData?.total_count}</td>
                                        </tr>

                                        <tr>
                                            <td className="text-left font-bold mt-2">CONTRIBUTION SCORE:</td>
                                            <td className="text-right">{commitData?.total_count}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="text-center opacity-75 mb-4">
                                    <div>
                                        SERVED BY: Avyana Enterpises
                                    </div>
                                    <div>
                                        {billing_time}
                                    </div>
                                </div>
                            </div>

                            <div className="text-xs pt-4 mb-4">
                                <div className="">
                                    COUPON CODE: {userData?.node_id}
                                </div>
                                <div className="opacity-75">
                                    Save for you next commit!
                                </div>
                            </div>
                            
                            <div className="flex flex-col justify-start items-left text-left text-xs mb-4">
                                <div>CARD #: **** **** **** 2025</div>
                                <div>AUTH CODE: {repoData[0]?.id}</div>
                                <div className="uppercase">CARDHOLDER: {userData?.login}</div>
                            </div>

                            <div>
                                THANK YOU FOR CODING!
                            </div>

                            <div className="w-full">
                                <BarcodeLink link={link} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </>
}

export default Search;