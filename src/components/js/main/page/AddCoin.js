import "./AddCoin.css"
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Delete from "./box/Delete";
import ReactQuill from "react-quill";
import CustomToolBar from "./box/CustomToolBar"
import EditorComponent from "./box/EditorComponent";

function AddCoin(prop) {
    const [round, setRound] = useState([])
    const [showImages, setShowImages] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [text, setText] = useState("");

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

    useEffect(() => {
        axios.get("/api/admin/addCoin")
            .then(response => {
                let data = response.data.data;
                setRound((data.roundList).map(element => {
                    return element
                }))
            })
            .catch(error => {
                Swal.fire({
                    showConfirmButton: "OK",
                    html: "error"
                })
            })
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        let formData = new FormData(event.currentTarget)

        //  List 형태로 받기 위해서는 back-end 에 중복된 key 값에 value 를 추가해 주면 된다.
        fileList.map((pic, index) => {
            formData.append("coin_pic_list", pic);
        })
        formData.append("coin_info", text)

        axios.post("/api/admin/addCoin", formData)
            .then(response => {
                let data = response.data;
                Swal.fire({
                    showConfirmButton: "OK",
                    icon : "success",
                    title: data.message
                })
                if (data.code == "0000") {
                    event.target.reset();
                    setShowImages([])
                    setFileList([])
                }
            })
            .catch(error => {
                Swal.fire({
                    icon : "error",
                    showConfirmButton: "OK",
                    title : "ERROR OCCURRED"
                })
            })
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
        setShowImages(showImages.filter((_, index) => index !== id));
        setFileList(fileList.filter((_, index) => index !== id));
    };

    const deleteHandler = (id) => {
        handleDeleteImage(id)
    }

    const handleText = (value) => {
        setText(value)
    }

    return (
        <>
            <h1>코인 추가</h1>
            <form id={"coin-form"} className={"coin-form"} onSubmit={handleSubmit} encType="multipart/form-data">
                <div className={"form-top"}>
                    <select className={"form-round form-select"} name={'round'} title={"회차"}>
                        {
                            round.map((element => (
                                    <option key={element} value={element}>{element} 회차</option>)
                            ))
                        }
                    </select>
                    <input type={"text"} placeholder={"코인 약자"} name={"coin_symbol"} className={"form-input-text"}/>
                    <input type={"text"} placeholder={"코인 명"} name={"coin_name"} className={"form-input-text"}/>
                </div>
                <div className={"form-middle"}>
                    {/*<CustomToolBar />*/}
                    <EditorComponent modules={modules} formats={formats} value={text} onChange={handleText}/>
                    <div className={"form-image"}>
                        <div className={"image-div"}>
                            {showImages.map((image, id) => (
                                <div className={"image-container"} key={id}>
                                    <img src={image} alt={`${image}-${id}`} width={"100px"} height={"100px"}/>
                                    <Delete deleteHandler={() => deleteHandler(id)}/>
                                </div>
                            ))}
                        </div>
                        <label htmlFor={"file"} className={"label-file"}>
                            <div className={"div-file"}>
                                <span>파일 업로드</span>
                            </div>
                        </label>
                        <input id={"file"} type={"file"} accept={"image/*"} name={"coin_pic"} multiple
                               placeholder={"이미지 파일"} className={"form-file"}
                               onChange={imagesPreview}/>
                    </div>
                </div>
                <div className={"form-bottom"}>
                    <input type={"number"} placeholder={"OTP 인증"} name={"admin_otp"} className={"form-input-num"}/>
                    <button className={"form-button"} type={"submit"}>코인 추가</button>
                </div>
            </form>
        </>
    )
}

export default AddCoin