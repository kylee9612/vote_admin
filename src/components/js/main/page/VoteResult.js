import "./VoteResult.css"

import DoughnutChart from "./box/DoughnutChart";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

function VoteResult() {

    const [doughnut, setDoughnut] = useState([]);

    const [startFilter, setStartFilter] = useState();
    const [endFilter, setEndFilter] = useState();

    useEffect(() => {
        axios.get("/api/admin/vote/results")
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

    const handleStartRadio = (val) => {
        console.log(val)
        setStartFilter(val)
        setDoughnut(doughnut)
    }

    const handleEndRadio = (val) => {
        setEndFilter(val)
        setDoughnut(doughnut)
    }

    const calculateStartDate = (start_date, today) => {
        if(startFilter === undefined)
            return true;
        else
            return (start_date <= today) === startFilter;
    }

    const calculateEndDate = (end_date, today) => {
        if(endFilter === undefined)
            return true;
        else
            return (end_date <= today) === endFilter;
    }

    function checkDate(data){
        let start_date = data.start_date;
        let end_date = data.end_date;
        let today = new Date();
        return calculateStartDate(start_date, today) && calculateEndDate(end_date, today);
    }

    return (
        <>
            <div className={'select-panel'}>
                <div className={'radio-panel'}>
                    <label><input className={'start-date'} name={'start-date'} type={'radio'} onClick={() => handleStartRadio()} defaultChecked={true}/><span>전체</span></label>
                    <label><input className={'start-date'} name={'start-date'} type={'radio'} onClick={() => handleStartRadio(true)}/><span>투표 시작 전</span></label>
                    <label><input className={'start-date'} name={'start-date'} type={'radio'} onClick={() => handleStartRadio(false)}/><span>투표 시작 후</span></label>
                </div>
                <hr/>
                <div className={'radio-panel'}>
                    <label><input className={'end-date'} name={'end-date'} type={'radio'} onClick={() => handleEndRadio()} defaultChecked={true}/><span>전체</span></label>
                    <label><input className={'end-date'} name={'end-date'} type={'radio'} onClick={() => handleEndRadio(true)}/><span>투표 종료 전</span></label>
                    <label><input className={'end-date'} name={'end-date'} type={'radio'} onClick={() => handleEndRadio(false)}/><span>투표 종료 후</span></label>
                </div>
            </div>
            <div className={'main-index'}>
                {
                    (doughnut).map(element =>
                            checkDate(element[0]) ? <DoughnutChart key={element[0].round} round={element} id={element[0].round}/> : ""
                    )
                }
            </div>
        </>
    )
}

export default VoteResult