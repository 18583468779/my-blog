import Link from "next/link";
import _ from "lodash";

type Options = {
  page: number;
  totalPage: number;
  urlMaker?: (n: number) => string;
};
const defaultUrlMaker = (n: number) => `?page=${n}`;

export const usePager = (options: Options) => {
  const { page, totalPage, urlMaker: _urlMaker } = options;
  const urlMaker = _urlMaker || defaultUrlMaker;
  const numbers = [];
  numbers.push(1);
  for (let i = page - 3; i <= page + 3; i++) {
    numbers.push(i);
  }
  numbers.push(totalPage);
  // console.log("_question");
  const pageNumbers = _.uniq(numbers)
    .sort()
    .filter((n) => n >= 1 && n <= totalPage)
    .reduce(
      (result, n) =>
        n - (result[result.length - 1] || 0) === 1
          ? result.concat(n)
          : result.concat(-1, n),
      []
    );

  const pager = (
    <div className="wrapper">
      {page !== 1 && (
        <Link href={urlMaker(page - 1)}>
          <span className="nextPage">{"<"}</span>
        </Link>
      )}
      <div className="listWrapper">
        {pageNumbers.map((n) => (
          <span key={n}>
            {n === -1 ? (
              <span>...</span>
            ) : (
              <Link
                href={urlMaker(n)}
                key={n}
                className={page == n ? "active" : ""}
              >
                {n}
              </Link>
            )}
          </span>
        ))}
      </div>

      {page < totalPage && (
        <Link href={urlMaker(page + 1)}>
          <span className="nextPage">{">"}</span>
        </Link>
      )}
      <span style={{ marginLeft: "10px" }}>
        第 {page} / {totalPage} 页
      </span>

      <style jsx>{`
        .wrapper {
          margin: 0 -8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .wrapper > a,
        .wrapper > span {
          margin: 0 4px;
        }
        .nextPage {
          display: inline-block;
          padding: 2px 5px;
          border: 1px solid #40474f;
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        .nextPage:hover {
          background: #40474f;
          color: #fff;
        }
        .listWrapper {
          margin: 0 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
      `}</style>
    </div>
  );
  return { pager };
};
