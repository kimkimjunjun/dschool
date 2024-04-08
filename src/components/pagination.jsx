const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    // 페이지당 최대 10개의 페이지 번호만 보이도록 설정
    const maxPages = 10;
    let startPage = 1;
    let endPage = maxPages;

    // 현재 페이지 주변에 5개의 페이지 번호만 보이도록 제한
    if (currentPage > maxPages / 2) {
        startPage = currentPage - Math.floor(maxPages / 2);
        endPage = currentPage + Math.ceil(maxPages / 2);
    }

    return (
        <nav>
            <ul className="flex w-[40rem] top-[43rem] justify-center space-x-2 my-10">
                {/* 이전 페이지로 이동 */}
                {currentPage > 1 && (
                    <li className="text-xl cursor-pointer" onClick={() => paginate(currentPage - 1)}>
                        &laquo;
                    </li>
                )}

                {/* 페이지 번호 보이기 */}
                {pageNumbers.slice(startPage - 1, endPage).map((number) => (
                    <li
                        key={number}
                        className={`${number === currentPage ? 'text-xl font-bold' : 'text-xl'} cursor-pointer`}
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </li>
                ))}

                {/* 다음 페이지로 이동 */}
                {currentPage < Math.ceil(totalItems / itemsPerPage) && (
                    <li className="text-xl cursor-pointer" onClick={() => paginate(currentPage + 1)}>
                        &raquo;
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
