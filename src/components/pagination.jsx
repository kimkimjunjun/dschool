// 페이지네이션 컴포넌트
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='flex justify-center space-x-2 my-10'>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`${number === currentPage ? 'text-xl font-bold' : 'text-xl'
                            } cursor-pointer`}
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;