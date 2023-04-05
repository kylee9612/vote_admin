import "./AddCoin.css"
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Delete from "./box/Delete";

function AddCoin(prop) {
    const [round, setRound] = useState([])
    const [showImages, setShowImages] = useState([]);
    const [fileList, setFileList] = useState([]);

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
        console.log(fileList)
        let formData = new FormData(event.currentTarget)
        formData.append("coin_pic[]",fileList)
        axios.post("/api/admin/addCoin", formData)
            .then(response => {
                let data = response.data;
                if (data.code !== "0000") {
                    Swal.fire({
                        showConfirmButton: "OK",
                        html: data.message
                    })
                }
            })
            .catch(error => {
                Swal.fire({})
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
        console.log(id)
        setShowImages(showImages.filter((_, index) => index !== id));
    };

    return (
        <>
            <h1>코인 추가</h1>
            <form id={"coin-form"} className={"coin-form"} onSubmit={handleSubmit} encType="multipart/form-data">
                <div className={"form-top"}>
                    <select className={"form-round"} name={'round'} title={"회차"}>
                        {
                            round.map((element => (
                                    <option key={element} value={element}>{element} 회차</option>)
                            ))
                        }
                    </select>
                    <input type={"text"} placeholder={"코인 약자"} name={"coin_symbol"}/>
                    <input type={"text"} placeholder={"코인 명"} name={"coin_name"}/>
                </div>
                <div className={"form-middle"}>
                <textarea className={"form-textarea"} name={"coin_info"} placeholder={"코인 정보"}>
                </textarea>
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
                        <input id={"file"} type={"file"} accept={"image/*"} name={"coin_pic"} multiple placeholder={"이미지 파일"}
                               onChange={imagesPreview}/>
                    </div>
                </div>
                <div className={"form-bottom"}>
                    <input type={"number"} placeholder={"OTP 인증"} name={"admin_otp"}/>
                    <button type={"submit"}>코인 추가</button>
                </div>
            </form>
        </>
    )
}

export default AddCoin