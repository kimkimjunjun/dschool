import { useState } from "react";
import searchicon from "../icons/searchicon.svg";
import Logo from "../icons/dschool_logo1.png";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const [query, setQuery] = useState("");

    // useEffect(() => {
    //     console.log(query)
    // }, [query])

    const navigate = useNavigate()

    const handleSearch = () => {
        navigate(`/search/${query}`);
    }

    const handleKeyPress = (e) => {
        if (e?.key === "Enter") {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div>
            <div className="w-[70rem] h-28 flex mx-auto">
                <Link to='/' className="flex flex-col items-center self-center ml-2 cursor-pointer">
                    <h1 className="text-[2.5rem] font-bold"><a className="text-red-600">C</a>school</h1>
                    <h1 className="text-sm font-medium font-sans">아이들을 위한 학부모 커뮤니티</h1>
                </Link>
                <div className="w-[30rem] h-10 flex border pl-2 ml-10 border-red-600 items-center self-center">
                    <input
                        className="outline-none cursor-pointer"
                        type="text"
                        placeholder="검색어를 입력하세요"
                        style={{ width: '90%', height: '90%' }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <span className="w-10 h-10">
                        <img
                            className="flex pt-2 cursor-pointer"
                            src={searchicon}
                            alt="사진"
                            onClick={handleSearch}
                        />
                    </span>
                    <div className="text-red-600 w-12 h-10 text-2xl border-l border-red-600 flex items-center justify-center">
                        #
                    </div>
                </div>
                {/* <ul>
                {results.map((result) => (
                    <li key={result._id}>{result._source.subject}</li>
                ))}
            </ul> */}
            </div>
            <div className='w-full border border-t-[#ececec] border-b-[#858585]'>
                <div className="flex text-base font-bold w-[70rem] h-12 items-center mx-auto pl-1">
                    <div className='flex space-x-5 cursor-pointer'>
                        {["입시", "학원", "학교", "수다", "리뷰", "소식", "토론"].map((text, index) => (
                            <span
                                key={index}
                                className={`hover:text-red-600 hover:border-b-4 border-red-600 h-12 pt-2.5`}
                            >
                                {text}
                            </span>
                        ))}
                        <span className='h-10 pt-2'>|</span>
                        {["#고등", "#중등", "#초등"].map((text, index) => (
                            <span
                                key={index}
                                className={`hover:text-red-600 hover:border-b-4 border-red-600 h-12 pt-2.5`}
                            >
                                {text}
                            </span>
                        ))}
                    </div>
                    <div className='flex text-sm items-center space-x-5 text-[#5a5a5a] ml-auto pr-1'>
                        <span className='flex'><p className='text-red-600'>홍길동</p>님 안녕하세요.</span>
                        <span className={`cursor-pointer hover:underline`}>로그아웃</span>
                        <span>|</span>
                        <span className={`cursor-pointer hover:underline`}>마이페이지</span>
                    </div>
                </div>
            </div>
        </div>
    );
}