import "./AddVote.css"
import EditorComponent from "../box/EditorComponent";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Loading from "../../Util/Loading";
import * as common from "../../Util/Common"
import {sweetAlert} from "../../Util/Common";

function AddVote(prop) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [round, setRound] = useState("1");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [disable, setDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    const location = prop.prop.location;

    const modules = {
        toolbar: {
            container: "#toolbar",
        },
    };

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "list",
        "bullet",
        "align",
        "color",
        "background",
        "image",
    ];

    const handleText = (value) => {
        setText(value)
    }

    const handleTitle = (value) => {
        setTitle(value)
    }

    useEffect(() => {
        let url = "/api/admin/round/list";
        setLoading(true)
        if (location.state !== null) {
            url += "/" + location.state.num;
            setDisable(true)
        } else
            url += "/last"
        axios.get(url).then((response) => {
            if (disable === false)
                setRound(response.data.data + 1);
            else {
                let roundObj = response.data.data;
                setRound(roundObj.round);
                setText(roundObj.content);
                setTitle(roundObj.title);
                setStartDate(new Date(roundObj.startDate));
                setEndDate(new Date(roundObj.endDate));
            }
        }).catch(error => {
            Swal.fire({
                icon: "error",
                showConfirmButton: "OK",
                title: "ERROR OCCURRED"
            })
        }).finally(() => {
            setLoading(false)
        })
    }, [disable, location.state])

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("content", text);
        formData.append("startDate", common.parseDateFormat(startDate));
        formData.append("endDate", common.parseDateFormat(endDate));
        formData.append("round",round);

        setLoading(true)
        axios.post("/api/admin/vote", formData, {
            headers: {
                "Content-Type": `application/json`,
            },
        }).then(response => {
            if (response.data.code === 0) {
                sweetAlert(response,"/main/vote/lists")
            }
        }).catch(() => {
            sweetAlert("error",null)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            {loading === true ? <Loading/> : ""}
            <h1>투표 추가</h1>
            <form className={"vote-form"} onSubmit={handleSubmit}>
                <div className={"form-top"}>
                    <select className={"form-round form-select"} name={'round'} title={"회차"} disabled={true}>
                        <option key={round} value={round}>{round}회차</option>
                    </select>
                    <input className={"form-input-text"} name={"title"} type={"text"} placeholder={"제목"} defaultValue={title}
                           onChange={handleTitle}/>
                    <div className={"datepicker-div"}>
                        <DatePicker
                            placeholderText='투표 시작일'
                            dateFormat='yyyy-MM-dd'
                            autoComplete='off'
                            className={"form-input-date"}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            disabled={disable}
                        />
                        <DatePicker
                            placeholderText='투표 종료일'
                            dateFormat='yyyy-MM-dd'
                            autoComplete='off'
                            className={"form-input-date"}
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            disabeld={disable}
                        />
                    </div>
                </div>
                <div className={"form-middle"}>
                    <EditorComponent modules={modules} formats={formats} value={text} onChange={handleText}/>
                </div>
                <div className={"form-bottom"}>
                    <button className={"form-button"} type={"submit"}>투표 추가</button>
                </div>
            </form>
        </>
    )
}

export default AddVote