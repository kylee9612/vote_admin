import {useEffect, useState} from "react";
import axios from "axios";
import RoundInfo from "./RoundInfo";
import "./RoundList.css"
import Modal from "../../Util/Modal";

function RoundList(prop) {

    const [list, setList] = useState([]);
    const [modalProp, setModalProp] = useState("");
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        axios.get("/api/admin/round/list", "")
            .then((response) => {
                setList(response.data.data)
            })
            .catch((error) => {

            })
    }, [])

    const modalHandler = (data) => {
        let prop = {
            "header" : data.title,
            "content" : data.content,
            "startDate" : new Date(data.startDate),
            "endDate" : new Date(data.endDate)
        }
        setModalProp(prop)
        setModalShow(true)
    }

    return (
        <>
            <h1>투표 회차 목록</h1>
            <div className={"roundList"}>
                {
                    list.map((data, index) => (
                        <RoundInfo key={index} data={data} index={index} clickEvent={()=>modalHandler(data)}/>
                    ))
                }
                {
                    modalShow === true ? <Modal isOpen={setModalShow} props={modalProp}></Modal> : ""
                }
            </div>
        </>
    )
}

export default RoundList;