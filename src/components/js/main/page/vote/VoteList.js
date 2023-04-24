import {useEffect, useState} from "react";
import axios from "axios";
import RoundInfo from "../box/RoundInfo";
import "./VoteList.css"

function VoteList(prop) {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("/api/admin/vote/list", "")
            .then((response) => {
                setList(response.data.data)
            })
            .catch((error) => {

            })
    }, [])
    return (
        <>
            <h1>투표 회차 목록</h1>
            <div className={"roundList"}>
                {
                    list.map((data, index) => (
                        <RoundInfo key={index} data={data} index={index}></RoundInfo>
                    ))
                }
            </div>
        </>
    )
}

export default VoteList;