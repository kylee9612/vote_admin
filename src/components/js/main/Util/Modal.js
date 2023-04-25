import React, {useEffect} from 'react';
import "./Modal.css"
import {useState} from "react";
import DatePicker from "react-datepicker";


const Modal = ({isOpen, props}) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const {
        header, content, startDate, endDate
    } = props;

    // useEffect()

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <>
            <div className={"Layer openLayer"}></div>
            <div className={"modal openModal"}>
                <section>
                    <header>
                        <div>{header}</div>
                        <DatePicker
                            className={"round-info-datepicker"}
                            dateFormat='yyyy/MM/dd'
                            selected={startDate}
                            disabled/>
                        <DatePicker
                            className={"round-info-datepicker"}
                            dateFormat='yyyy/MM/dd'
                            selected={endDate}
                            disabled/>
                        <div dangerouslySetInnerHTML={{__html: content}}></div>
                    </header>

                    <footer className={'modal_footer'}>
                        <button className="update_notice" onClick={() => isOpen(false)}>
                            close
                        </button>
                    </footer>
                </section>
            </div>
        </>
    );
};

export default Modal;