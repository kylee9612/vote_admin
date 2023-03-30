import "./Admin.css"
import DoughnutChart from "./box/DoughnutChart";
import {useEffect, useState} from "react";
import axios from "axios";

function Admin() {

    /**
     * TODO
     * reg_date = 2023-03-30
     * backend
     * 인덱스 페이지의 경우 조회수, 대표 투표 차트 (최신)
     * 등 필요한것 불러와서 띄울 수 있도록 수정 요망
     */

    const [doughnut, setDoughnut] = useState([]);

    useEffect(() => {
        const chart = [];
        axios.get("/api/admin/voteResult")
            .then(response => {
                Object.keys(response.data).map((element) => {
                    chart.push(response.data[element])
                })
                setDoughnut(chart)
                console.log(doughnut)
            })
            .catch(error => {
                alert(error)
            })
    }, [])

    return (
        <div className={'main-index'}>
            {
                (doughnut).map(element =>
                    <DoughnutChart round={element} id={element[0].round}/>
                )
            }
        </div>
    )
}

export default Admin