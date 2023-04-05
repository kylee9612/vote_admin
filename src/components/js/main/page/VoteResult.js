import "./VoteResult.css"

import DoughnutChart from "./box/DoughnutChart";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

function VoteResult() {

    const [doughnut, setDoughnut] = useState([]);

    useEffect(() => {
        axios.get("/api/admin/voteResult")
            .then(response => {
                let data = response.data;
                setDoughnut(
                    Object.keys(data.data).map((element) => {
                        return data.data[element]
                    }))
            })
            .catch(error => {
                Swal.fire({
                    showConfirmButton: "OK",
                    html: "error"
                })
            })
    }, [])

    return (
        <>
            <div className={'select-panel'}>
                <div className={'radio-panel'}>
                    <label><input className={'start-date'} name={'start-date'} type={'radio'} checked={"true"}/><span>전체</span></label>
                    <label><input className={'start-date'} name={'start-date'} type={'radio'}/><span>투표 시작 전</span></label>
                    <label><input className={'start-date'} name={'start-date'} type={'radio'}/><span>투표 시작 후</span></label>
                </div>
                <div className={'radio-panel'}>
                    <label><input className={'end-date'} name={'end-date'} type={'radio'} checked={"true"}/><span>전체</span></label>
                    <label><input className={'end-date'} name={'end-date'} type={'radio'}/><span>투표 종료 전</span></label>
                    <label><input className={'end-date'} name={'end-date'} type={'radio'}/><span>투표 종료 후</span></label>
                </div>
            </div>
            <div className={'main-index'}>

                {
                    (doughnut).map(element =>
                        <DoughnutChart round={element} id={element[0].round}/>
                    )
                }
            </div>
        </>
    )
}

export default VoteResult