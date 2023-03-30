import DoughnutChart from "./box/DoughnutChart";
import {useEffect, useState} from "react";
import axios from "axios";

function VoteResult() {

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

export default VoteResult