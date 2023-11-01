import React from "react";

export default function TopButton() {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-40 h-10 border border-[#d6d6d6] bg-white items-center self-center flex ml-auto cursor-pointer mt-2" onClick={handleScrollToTop}>
            <span className="mx-auto text-xs font-bold">맨위로</span>
        </div>
    )
}