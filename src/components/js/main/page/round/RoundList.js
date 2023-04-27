import {useEffect, useState} from "react";
import axios from "axios";
import RoundInfo from "./RoundInfo";
import "./RoundList.css"
import Modal from "../../Util/Modal";
import Loading from "../../Util/Loading";
import {sweetAlert} from "../../Util/Common";

function RoundList(prop) {

    const [list, setList] = useState([]);
    const [modalProp, setModalProp] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = prop.prop.navigate;

    useEffect(() => {
        axios.get("/api/admin/round/list", "")
            .then((response) => {
                setList(response.data.data)
            })
            .catch(() => {
                sweetAlert("error",null)
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    const handleEdit = (round) => {
        navigate("/main/vote", {state: {"num": round}})
    }

    const modalHandler = (data) => {
        const header = `<h3>` + data.title + `</h3>`
        const buttonList = [
            {
                buttonLabel: "edit",
                buttonFunc: () => handleEdit(data.round)
            }
        ]
        const prop = {
            "header": header,
            "content": data.content,
            "buttonList": buttonList
        }
        setModalProp(prop)
        setModalShow(true)
    }

    return (
        <>
            {loading === true ? <Loading/> : ""}
            <h1>투표 회차 목록</h1>
            <div className={"roundList"}>
                {
                    list.map((data, index) => (
                        <RoundInfo key={index} data={data} index={index} clickEvent={() => modalHandler(data)}/>
                    ))
                }
                {
                    modalShow === true ? <Modal isOpen={setModalShow} props={modalProp}/> : ""
                }
            </div>
        </>
    )
}

export default RoundList;