import {useNavigate, useParams} from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Delete from "../box/Delete";

const EditNotice = (props) => {
    const id = useParams();
    const nt_no = id.id;
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [showImages, setShowImages] = useState([]);
    const [fileList, setFileList] = useState([]);
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    let history = useNavigate();
    useEffect(() => {
        const params = {
            "nt_no": nt_no
        }
        axios.post("/api/notice/getNotice", params)
            .then((response) => {
                const notice = response.data.data.notice;
                const notice_pic = response.data.data.noticePictures;
                console.log(response.data.data.noticePictures);
                setTitle(notice.nt_title)
                setText(notice.nt_contents);
                imagesPreviewFromDB(notice_pic); // noticePictures를 fileList에 업데이트
            }).catch((error) => {
            console.log("error :: " + error)
        })
    }, [])

    function imagesPreviewFromDB(imageLists) {
        let imageUrlLists = [...showImages];
        let file = [...fileList];
        for (let i = 0; i < imageLists.length; i++) {
            const blob = imageLists[i].picture;
            const currentImageUrl = "data:image/*;base64," + blob;
            imageUrlLists.push(currentImageUrl);
        }
        if (imageUrlLists.length > 10) {
            imageUrlLists = imageUrlLists.slice(0, 10);
        }
        setShowImages(imageUrlLists);
        setFileList(file);
    }

    function imagesPreview(event) {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
        let file = [...fileList];

        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
            file.push(imageLists[i])
            const newImageIndex = imageUrlLists.length - 1; // 새로운 이미지의 인덱스
            console.log("새로운 이미지의 인덱스: ", newImageIndex);
        }
        if (imageUrlLists.length > 10) {
            imageUrlLists = imageUrlLists.slice(0, 10);
        }
        setShowImages(imageUrlLists);
        setFileList(file);
    }

    function emptyCheck() {
        if (title == "" || text == "") {
            return false;
        } else {
            return true;
        }
    }

    function editNotice(event) {
        event.preventDefault()
        let start = emptyCheck();
        if (start) {
            let formData = new FormData(event.currentTarget);
            formData.append("nt_contents", text)
            fileList.map((pic, index) => {
                formData.append("notice_pic_list", pic);
            })
            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }
            const url = "/api/notice/editNotice"
            axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data'},})
                .then((response) => {
                    console.log(JSON.stringify(response));
                    alert(response.data.message);
                }).catch((error) => {
                console.log(JSON.stringify(error));
                alert(JSON.stringify(error.data.message));
            }).finally((e) => {
                history(-1)
            })
        } else {
            alert("제목과 내용을 확인해 주세요.")
        }
    }

    const handleDeleteImage = (id, image) => {
        console.log(image);
        const isBase64 = "data:image/*;base64,";
        if (image.indexOf(isBase64) !== -1) {
            console.log("nt_no : " + nt_no + " _ " + id);
            const url = "/api/notice/deleteNoticeImage";
            const parms = {
                "nt_no": nt_no,
                "order_idx": id
            }
            axios.post(url, parms).then((e) => {
                console.log(e);
            })
                .catch((e) => {
                    console.log(e);
                    alert("이미지 삭제가 실패했습니다. \n관리자에게 문의하세요.");
                });
        }
        setShowImages(showImages.filter((_, index) => index !== id));
        setFileList(fileList.filter((_, index) => index !== id));
    };


    const deleteHandler = (id, image) => {
        handleDeleteImage(id, image)
    }


    return (<form id={"noti_form"} onSubmit={editNotice} encType="multipart/form-data">
        <div className={"editNotice_wrap"}>
            <div className={"editNotice_head_wrap"}>
                <input type={"hidden"} id={"nt_no"} name={"nt_no"} value={nt_no}/>
                <label htmlFor={"title"}>제목</label>
                <input id="title" type={"text"} name={"nt_title"} onChange={onChangeTitle} value={title}
                       style={{width: "90%"}}/>
                <button type={"button"}>삭제</button>
            </div>
            <div className={"editNotice_contents_wrap"}>
                <label></label>
                <ReactQuill value={text} onChange={setText}></ReactQuill>
            </div>
            <div className={"form-image"}>
                {showImages.map((image, id) => (
                    <div className={"image-container"} key={id}>
                        <img src={image} alt={`${image}-${id}`} width={"100px"} height={"100px"}/>
                        <Delete deleteHandler={() => deleteHandler(id, image)}/>
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
    </form>)
}

export default EditNotice