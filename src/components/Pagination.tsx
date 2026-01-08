interface PaginationProps {
  handlePagination: (a: number) => void;
  numPage: number;
  total?: number;
}

export default function Pagination({
  handlePagination,
  numPage,
  total = 500,
}: PaginationProps) {
  // calculating pagination buttons
  const paginationButtons = [];
  const start = Math.max(2, numPage - 2);
  const end = Math.min(total - 1, numPage + 2);

  for (let i = start; i <= end; i++) {
    paginationButtons.push(i);
  }

  return (
    <nav aria-label="Pagination" className="my-5">
      <ul className="flex gap-3">
        {/*Page number 1*/}
        <li>
          <Button
            page={numPage}
            val={1}
            handlePagination={handlePagination}
          />
        </li>

        {start > 2 && <li aria-hidden={true} className="flex items-center"><Ellipsis /></li>}

        {/*Pages 2 before, 2 after and current = 5 btns*/}
        {paginationButtons.map((val) => (
          <li key={val}>
            <Button page={numPage} val={val} handlePagination={handlePagination}/>
          </li>
        ))}
        {end < total - 1 && <li aria-hidden={true} className="flex items-center"><Ellipsis /></li>}

        {/*Page number total= 500*/}
        <li>
          <Button
            page={numPage}
            val={total}
            handlePagination={handlePagination}
          />
        </li>
      </ul>
    </nav>
  );
}

function Ellipsis() {
  return (
    <span className="flex justify-center items-center gap-0.5">
      <span className="w-1.25 h-1.25 dark:bg-gray-600 bg-gray-400  rounded-[50%]"></span>
      <span className="w-1.25 h-1.25 dark:bg-gray-600 bg-gray-400  rounded-[50%]"></span>
      <span className="w-1.25 h-1.25 dark:bg-gray-600 bg-gray-400  rounded-[50%]"></span>
    </span>
  );
}

interface ButtonProps {
  page: number;
  val: number;
  handlePagination: (a: number) => void;
}

function Button({ page, val, handlePagination }: ButtonProps) {
  const btnBase =
    `px-3 py-2 rounded-lg border transition-colors dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 
    border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer`;
  const btnActive = "bg-red-600 border-red-600 text-white disabled:pointer-events-none";
  return (
    <button
      type="button"
      disabled={page == val}
      onClick={() => handlePagination(val)}
      className={`${btnBase} ${page == val && btnActive} `}
    >
      {val}
    </button>
  );
}
