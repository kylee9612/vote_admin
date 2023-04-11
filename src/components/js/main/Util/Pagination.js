import React from "react";

const Pagination = ({curPage, lastPage, setCurPage}) => {

    function goNext() {
        if (curPage < lastPage) {
            setCurPage(curPage + 1);
        } else {
            alert("마지막 페이지입니다.")
        }
    }

    function goBack() {
        if (curPage >= lastPage) {
            setCurPage(curPage - 1);
        } else {
            alert("첫번째 페이지입니다.")
        }
    }


    return (
        <div className="pagination">
            <button onClick={goBack}>◀</button>
            <div className={"curPage"}>{curPage}</div>
            <p> /</p>
            <div className={"lastPage"}>{lastPage}</div>
            <button onClick={goNext}> ▶</button>
        </div>)
}
export default Pagination