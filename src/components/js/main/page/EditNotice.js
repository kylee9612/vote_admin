import {useNavigate, useParams} from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useEffect, useState} from "react";
import axios from "axios";
import error from "../../side/Error";

const EditNotice = (props) => {
    const id = useParams();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const onChangeTitle = (e) => {setTitle(e.target.value)}
    let history = useNavigate();
    useEffect(() => {

        console.log(" id.id : " +id.id);
        const nt_no = id.id
        let notice;
        const params = {
            "nt_no": nt_no
        }
        axios.post("/api/notice/getNotice", params)
            .then((response) => {
                const notice = response.data.data.notice;
                console.log("response :: " + JSON.stringify(notice.nt_title))
                console.log("response :: " + notice.nt_title)

                setTitle(notice.nt_title)
                setText(notice.nt_contents);
            }).catch((error) => {
                console.log("error :: " + error)
        })
    }, [])


    function editNotice(id) {
        const url = "/api/notice/editNotice"
        const params = {
            "nt_no" : id ,
            "nt_title" : title ,
            "nt_contents" : text
        };

        axios.post(url,params)
            .then((response) =>{
                console.log(JSON.stringify(response));
                alert(response.data.message);

            }).catch((error)=>{
                console.log(JSON.stringify(error));
                alert(JSON.stringify(error.data.message));
            }).finally((e)=>{
            history(-1)
            })
    }

    return <>
        <div className={"editNotice_wrap"}>
            <div className={"editNotice_head_wrap"}>
                <label htmlFor={"title"} >제목</label>
                <input id="title" type={"text"} value={title} onChange={onChangeTitle}/>
            </div>
            <div className={"editNotice_contents_wrap"}>
                <label></label>
                <ReactQuill value={text} onChange={setText}></ReactQuill>
            </div>
        </div>
        <div className={"editNotice_footer"}>
            <button onClick={() => editNotice(id.id)}>등록하기</button>
            <button onClick={() => history(-1)}>뒤로가기</button>
        </div>
    </>
}

export default EditNotice