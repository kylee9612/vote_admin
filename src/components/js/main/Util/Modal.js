import React, {useEffect} from 'react';
import "./Modal.css"
import {useState} from "react";


const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const {
        id, modalVisibleId, setModalVisibleId,
        header, contents, date, count
    } = props;

    const [noticeUpdate , setNoticeDetail] = useState();

    // useEffect()


    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <>
            <dav className={modalVisibleId === id ? "Layer openLayer" : "Layer"} onClick={setModalVisibleId}></dav>
            <div className={modalVisibleId === id ? "modal openModal" : "modal"} >
                <section>

                    <header>
                        <div>{header}</div>
                        <div style={{ "font-weight" : "400","font-size": "80%"}}>{date}</div>
                    </header>
                    <main>{contents}</main>

                    <footer className={'modal_footer'}>
                        <button className="update_notice" onClick={setNoticeDetail}>
                            close
                        </button>
                    </footer>
                </section>
            </div>
        </>
    );
};

export default Modal;