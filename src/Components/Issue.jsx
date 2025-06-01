import { useState, useEffect } from "react";
import githubV2Data from "../dummyData/githubV2.json";
import "../styleSheet/Issue.css";
import IssueChart from "./IssueChart";

const Issue = () => {
  const [data] = useState(githubV2Data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNumber, setSearchNumber] = useState("");

  const itemPerPage = 10;
  //! search engine optimization
  useEffect(() => {
    const filtered = data.filter((item) =>
      searchNumber === ""
        ? true
        : item.number.toString().startsWith(searchNumber)
    );

    const newTotalPages = Math.ceil(filtered.length / itemPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(1);
    }
  }, [searchNumber, data, currentPage, itemPerPage]);

  
  // Filter data by issue number
  const filteredData = data.filter((item) =>
    searchNumber === "" ? true : item.number.toString().startsWith(searchNumber)
  );

  const totalPage = Math.ceil(filteredData.length / itemPerPage);
  const safePage = Math.min(currentPage, totalPage || 1);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  let currentItem = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // pagination buttons
  const visiblePage = 5;
  const getPageNumber = () => {
    let startPage = Math.floor((safePage - 1) / visiblePage) * visiblePage + 1;
    let endPage = Math.min(startPage + visiblePage - 1, totalPage);

    let pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };
  const pageNumbers = getPageNumber();

  // oldest issue
  const oldestOpenIssue = data
    .filter((item) => item.state === "open")
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))[0];

  console.log(oldestOpenIssue);
  console.log("oldest date", oldestOpenIssue.created_at);

  const newestOpenIssue = data
    .filter((item) => item.state == "closed")
    .sort((a, b) => new Date(b.closed_at) - new Date(a.closed_at))[0];

  console.log(newestOpenIssue);
  console.log("newest date", newestOpenIssue.closed_at);

  // total number of open and closed issue
  const totalOpenIssue = data.filter((item) => item.state === "open").length;
  const totalClosedIssue = data.filter(
    (item) => item.state === "closed"
  ).length;

  console.log(totalOpenIssue, totalClosedIssue);

  //! quarter

  const getQuarter = (detastr) => {
    const month = new Date(detastr).getMonth() + 1;
    if (month >= 1 && month <= 3) return "q1";
    if (month >= 4 && month <= 6) return "q2";
    if (month >= 7 && month <= 9) return "q3";
    return "q4";
  };
  console.log(getQuarter(data[10].created_at));

  return (
    <>
      <div className="issueContainer">
        <h2>GitHub Issues</h2>

        <div className="chart-container">
          <IssueChart data={data} />
        </div>

        <input
          type="number"
          placeholder="Search by issue number"
          value={searchNumber}
          onChange={(e) => setSearchNumber(e.target.value)}
          style={{ marginBottom: "10px", padding: "5px" }}
        />
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Title</th>
              <th>Created at</th>
              <th>Closed at</th>
              <th>milstone</th>
            </tr>
          </thead>
          <tbody>
            {currentItem.length > 0 ? (
              currentItem.map((item) => (
                <tr key={item.id}>
                  <td>{item.number}</td>
                  <td>{item.title}</td>
                  <td>{item.created_at}</td>
                  <td>{item.closed_at || "Still open"}</td>
                  <td>
                    {item.milestone ? item.milestone.title : "No milestone"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {pageNumbers[0] > 1 && (
          <button onClick={() => setCurrentPage(pageNumbers[0] - 1)}>◀</button>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={number === safePage ? "active" : ""}
          >
            {number}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPage && (
          <button
            onClick={() =>
              setCurrentPage(pageNumbers[pageNumbers.length - 1] + 1)
            }
          >
            ▶
          </button>
        )}
      </div>
    </>
  );
};

export default Issue;
