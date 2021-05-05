import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [dataArray, setDataArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = `https://jsonplaceholder.typicode.com/posts?_limit=${5}&_page=${currentPage}`;
  useEffect(() => {
    const data = fetch(apiUrl, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((dataJson) => {
        //console.log("inside json", dataJson);
        setDataArray(dataJson);
      })
      .catch((error) => console.log(error));
    //console.log(data);
    console.log(currentPage)
  }, [currentPage]);

  const handleClickPrev = () => {
    setCurrentPage(currentPage <= 1 ? currentPage : currentPage - 1);
  };
  const handleClickNext = () => {
    setCurrentPage(currentPage >= 20 ? currentPage : currentPage + 1);
  };

  const goHandler = () => {
    const pageNumber = document.getElementById("pageNavigationInput").value;
    if(pageNumber > 20 || pageNumber < 1)
      return;
    setCurrentPage(parseInt(pageNumber))
  }
  const MAX_PAGE_NO = 20;
  const pageNavigationArray = new Array(MAX_PAGE_NO).fill(1).map((item, index) => index+1)
  return (
    <div className="App">
      <ul className="data-list-container">
        {dataArray.map((data, idx) => (
          <li key={idx} className="data-item">
            <p>Id: {data.id}</p>
            <h4>title</h4>{data.title}
            <h4>body</h4>{data.body}
          </li>
        ))}
      </ul>
      <div id="page-navigation-2">
        <input id="pageNavigationInput" type="number" min="1" max="20"/>
        <button onClick={goHandler}>Go</button>
      </div>
      <div id="page-navigation-1">
        <button disabled={currentPage === 1} onClick={handleClickPrev}>
          Previous
        </button>
        {pageNavigationArray.map((item, index) => 
            <button key={index} disabled={currentPage===item} onClick={() => setCurrentPage(item)}>{item}</button>
            )}
        <button disabled={currentPage === 20} onClick={handleClickNext}>
          Next
        </button>
      </div>
    </div>
  );
}
