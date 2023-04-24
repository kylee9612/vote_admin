import "./AddVote.css"
import EditorComponent from "../box/EditorComponent";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

function AddVote() {
    const [text, setText] = useState("");
    const [round, setRound] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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

    useEffect(() => {
        axios.get("/api/admin/vote/list/last")
            .then((response) => {
                setRound(response.data.data + 1);
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    showConfirmButton: "OK",
                    title: "ERROR OCCURRED"
                })
            })
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("content", text);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);

        axios.post("/api/admin/vote", formData, {
            headers: {
                "Content-Type": `application/json`, // application/json 타입 선언
            },
        }).then(response => {
            if (response.data.code == "0000") {
                Swal.fire({
                    showConfirmButton: "OK",
                    icon: "success",
                    title: response.data.message
                })
                event.target.reset();
                setText("");
            }
        }).catch(error => {
            Swal.fire({
                icon: "error",
                showConfirmButton: "OK",
                title: "ERROR OCCURRED"
            })
        })
    }

    return (
        <>
            <h1>투표 추가</h1>
            <form className={"vote-form"} onSubmit={handleSubmit}>
                <div className={"form-top"}>
                    <select className={"form-round form-select"} name={'round'} title={"회차"} disabled={true}>
                        {
                            <option key={round} value={round}>{round}회차</option>
                        }
                    </select>
                    <input className={"form-input-text"} name={"title"} type={"text"} placeholder={"제목"}/>
                    <div className={"datepicker-div"}>
                        <DatePicker
                            placeholderText='투표 시작일'
                            dateFormat='yyyy/MM/dd'
                            autoComplete='off'
                            className={"form-input-date"}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                        <DatePicker
                            placeholderText='투표 종료일'
                            dateFormat='yyyy/MM/dd'
                            autoComplete='off'
                            className={"form-input-date"}
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
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