
interface PaginationProps {
    handlePagination: (a:number)=>void
    numPage:number
}

export default function Pagination({handlePagination,numPage}:PaginationProps){
    
     // calculating pagination buttons
  const paginationButtons = [];
  

  while (true) {
    let i, j;
    switch (numPage) {
      case 1:
        i = 2;
        j = 4;
        break;
      case 2:
        i = 2;
        j = 5;
        break;
      case 3:
        i = 2;
        j = 6;
        break;
      default:
        i = numPage - 2;
        j = numPage + 3;
    }
    if(j>499) j=499
    for (let k = i; k <= j; k++) {
      paginationButtons.push(k);
    }
    break;
  }

    return <ul className="flex gap-3">
          <li>
            <button
              disabled={numPage == 1}
              onClick={() => handlePagination(1)}
              className={`p-2 px-5 bg-gray-300 text-2xl hover:bg-gray-200 hover:cursor-pointer ${
                numPage == 1 && "bg-gray-200! border border-gray-600"
              }`}
            >
              1
            </button>
          </li>
          {numPage >= 5 && (
            <div className="flex justify-center items-center gap-0.5">
              <div className="w-1.25 h-1.25 bg-black rounded-[50%]"></div>
              <div className="w-1.25 h-1.25 bg-black rounded-[50%]"></div>
              <div className="w-1.25 h-1.25 bg-black rounded-[50%]"></div>
            </div>
          )}
          {paginationButtons.map((val) => (
            <li key={val}>
              <button
                disabled={numPage == val}
                onClick={() => handlePagination(val)}
                className={`p-2 px-4 bg-gray-300 text-2xl  hover:bg-gray-200 hover:cursor-pointer ${
                  numPage == val && "bg-gray-200! border border-gray-600"
                }`}
              >
                {val}
              </button>
            </li>
          ))}
          {numPage <= 495 && <div className="flex justify-center items-center gap-0.5">
              <div className="w-1.25 h-1.25 bg-black rounded-[50%]"></div>
              <div className="w-1.25 h-1.25 bg-black rounded-[50%]"></div>
              <div className="w-1.25 h-1.25 bg-black rounded-[50%]"></div>
            </div>}
          <li>
            <button
              disabled={numPage == 500}
              onClick={() => handlePagination(500)}
              className={`p-2  bg-gray-300 text-2xl hover:bg-gray-200 hover:cursor-pointer ${
                numPage == 500 && "bg-gray-200! border border-gray-600"
              }`}
            >
              500
            </button>
          </li>
        </ul>
}