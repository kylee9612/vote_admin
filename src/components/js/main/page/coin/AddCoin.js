import "./AddCoin.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Delete from "../box/Delete";
import EditorComponent from "../box/EditorComponent";
import Loading from "../../Util/Loading";
import {sweetAlert} from "../../Util/Common";

function AddCoin() {
    const [round, setRound] = useState([])
    const [showImages, setShowImages] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);

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
        axios.get("/api/admin/coins")
            .then(response => {
                let data = response.data.data;
                setRound((data.roundList).map(element => {
                    return element
                }))
            })
            .catch(() => {
                sweetAlert("error",null)
            })
            .finally(()=>{
                setLoading(false)
            })
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        let formData = new FormData(event.currentTarget)

        //  List 형태로 받기 위해서는 back-end 에 중복된 key 값에 value 를 추가해 주면 된다.
        fileList.map((pic, index) => {
            formData.append("coin_pic_list", pic);
        })
        formData.append("coinInfo", text)
        setLoading(true)
        axios.post("/api/admin/coins", formData)
            .then(response => {
                let data = response.data;
                sweetAlert(response,null)
                if (data.code === 0) {
                    event.target.reset();
                    setShowImages([])
                    setFileList([])
                }
            })
            .catch(() => {
                sweetAlert("error",null)
            }).finally(()=>{
                setLoading(false)
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
            {loading === true ? <Loading/> : ""}
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
                    <input type={"text"} placeholder={"코인 약자"} name={"coinSymbol"} className={"form-input-text"}/>
                    <input type={"text"} placeholder={"코인 명"} name={"coinName"} className={"form-input-text"}/>
                </div>
                <div className={"form-middle"}>
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