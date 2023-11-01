import { useNavigate } from "react-router-dom";

export default function BackButton() {
    let navigate = useNavigate();

    let goBack = () => {
        navigate(-1);
    };

    return (
        <div className="w-40 h-10 border border-[#d6d6d6] bg-white items-center self-center flex cursor-pointer mt-2" onClick={goBack}>
            <span className="mx-auto text-xs font-bold">이전목록</span>
        </div>
    )
}