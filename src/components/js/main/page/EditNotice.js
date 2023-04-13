import {useNavigate, useParams} from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useEffect, useState} from "react";
import axios from "axios";
import error from "../../side/Error";
import Delete from "./box/Delete";

const EditNotice = (props) => {
    const id = useParams();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [showImages, setShowImages] = useState([]);
    const [fileList, setFileList] = useState([]);
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    let history = useNavigate();
    useEffect(() => {

        console.log(" id.id : " + id.id);
        const nt_no = id.id
        let notice;
        const params = {
            "nt_no": nt_no
        }
        axios.post("/api/notice/getNotice", params)
            .then((response) => {
                const notice = response.data.data.notice;
                console.log("response :: " + JSON.stringify(notice.nt_title))
                console.log("response :: " + notice.nt_contents)

                setTitle(notice.nt_title)
                setText(notice.nt_contents);
            }).catch((error) => {
            console.log("error :: " + error)
        })
    }, [])

    function emptyCheck(){
        if(title == "" || text == ""){
            return false;
        }else{
            return true;
        }
    }
    function editNotice(event) {
        event.preventDefault()
        let start = emptyCheck();
        if(start){
            let formData = new FormData(event.currentTarget);

            formData.append("nt_contents", text)
            fileList.map((pic, index) => {
                formData.append("notice_pic_list", pic);
            })
            // formData.append("params", params);

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }

            const url = "/api/notice/editNotice"

            axios.post(url, formData ,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                ,})
                .then((response) => {
                    console.log(JSON.stringify(response));
                    alert(response.data.body.message);

                }).catch((error) => {
                console.log(JSON.stringify(error));
                alert(JSON.stringify(error.message));
            }).finally((e) => {
                history(-1)
            })
        }else{
            alert("제목과 내용을 확인해 주세요.")
        }
    }

    function imagesPreview(event) {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
        let file = [...fileList];

        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
            file.push(imageLists[i])
        }

        if (imageUrlLists.length > 10) {
            imageUrlLists = imageUrlLists.slice(0, 10);
        }

        setShowImages(imageUrlLists);
        setFileList(file);
    }

    const handleDeleteImage = (id) => {

    };

    return <form id={"noti_form"} onSubmit={editNotice} encType="multipart/form-data">
        <div className={"editNotice_wrap"}>
            <div className={"editNotice_head_wrap"}>
                <input type={"hidden"} id={"nt_no"} name={"nt_no"} value={id.id}/>
                <label htmlFor={"title"}>제목</label>
                <input id="title" type={"text"} name={"nt_title"} onChange={onChangeTitle} value={title}
                       style={{width: "90%"}}/>
                <button type={"button"} >삭제</button>
            </div>
            <div className={"editNotice_contents_wrap"}>
                <label></label>
                <ReactQuill value={text} onChange={setText}></ReactQuill>
            </div>
            <div className={"form-image"}>
                {showImages.map((image, id) => (
                    <div className={"image-container"} key={id}>
                        <img src={image} alt={`${image}-${id}`} width={"100px"} height={"100px"}/>
                        <Delete onClick={() => handleDeleteImage(id)}/>
                    </div>
                ))}
                <label htmlFor={"file"} className={"label-file"}>
                    <div className={"div-file"}>
                        <span>파일 업로드</span>
                    </div>
                </label>
                <input id={"file"} type={"file"} accept={"image/*"} name={"noti_pic"} multiple placeholder={"이미지 파일"}
                       onChange={imagesPreview}/>
            </div>
        </div>
        <div className={"editNotice_footer"}>
            <button type="submit">등록하기</button>
            <button type="button" onClick={() => history(-1)}>뒤로가기</button>
        </div>
    </form>
}

export default EditNotice