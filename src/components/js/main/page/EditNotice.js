import {useNavigate} from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useEffect} from "react";
import axios from "axios";

const EditNotice = (type , id) => {
    let history = useNavigate();

    useEffect(() => {
        let notice;
        const params = {
            "nt_no": id
        }
        axios.get("/api/notice/getNotice", {params})
            .then((response) => {

            }).catch((error) => {

        })
    }, [])


    function editNotice(type, id) {
        console.log(type);


        let url = "";
        let params = [];

        if (type == "insert") {
            console.log("insert");
        } else {
            console.log("update");
        }
    }

    return <>
        <div className={"editNotice_wrap"}>
            <div className={"editNotice_head_wrap"}>
                <label htmlFor={"title"} >제목</label>
                <input id="title" type={"text"}/>
            </div>
            <div className={"editNotice_contents_wrap"}>
                <label></label>
                <ReactQuill></ReactQuill>
            </div>
        </div>
        <div className={"editNotice_footer"}>
            <button onClick={() => editNotice(type, id)}>등록하기</button>
            <button onClick={() => history(-1)}>뒤로가기</button>
        </div>
    </>
}

export default EditNotice