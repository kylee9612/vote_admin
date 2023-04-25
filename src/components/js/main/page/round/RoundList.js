import {useEffect, useState} from "react";
import axios from "axios";
import RoundInfo from "./RoundInfo";
import "./RoundList.css"

function RoundList(prop) {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("/api/admin/round/list", "")
            .then((response) => {
                setList(response.data.data)
                console.log(response.data)
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

export default RoundList;