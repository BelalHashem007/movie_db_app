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
    <nav aria-label="Pagination">
      <ul className="flex gap-3">
        {/*Page number 1*/}
        <li>
          <Button
            page={numPage}
            val={1}
            handlePagination={handlePagination}
          />
        </li>

        {start > 2 && <Ellipsis />}

        {/*Pages 2 before, 2 after and current = 5 btns*/}
        {paginationButtons.map((val) => (
          <li key={val}>
            <Button page={numPage} val={val} handlePagination={handlePagination}/>
          </li>
        ))}
        {end < total - 1 && <Ellipsis />}

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
    <div className="flex justify-center items-center gap-0.5">
      <div className="w-1.25 h-1.25 bg-black rounded-[50%]"></div>
      <div className="w-1.25 h-1.25 bg-black rounded-[50%]"></div>
      <div className="w-1.25 h-1.25 bg-black rounded-[50%]"></div>
    </div>
  );
}

interface ButtonProps {
  page: number;
  val: number;
  handlePagination: (a: number) => void;
}

function Button({ page, val, handlePagination }: ButtonProps) {
  const btnBase =
    "p-2 px-4 bg-gray-200 text-2xl hover:bg-gray-100 transition-colors hover:cursor-pointer disabled:cursor-default";
  const btnActive = "bg-black! text-white ";
  return (
    <button
      type="button"
      disabled={page == val}
      onClick={() => handlePagination(val)}
      className={`${btnBase} ${page == val && btnActive}`}
    >
      {val}
    </button>
  );
}
