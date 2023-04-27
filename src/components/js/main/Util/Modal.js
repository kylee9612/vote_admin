import React, {useEffect, useState} from 'react';
import "./Modal.css"


const Modal = ({isOpen, props}) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const {
        header, content ,contentObject, buttonList
    } = props;

    return (// 모달이 열릴때 openModal 클래스가 생성된다.
        <>
            <div className={"Layer openLayer"}></div>
            <div className={"modal openModal"}>
                <section>
                    <header>
                        <div dangerouslySetInnerHTML={{__html: header}}></div>
                    </header>
                    {content !== undefined ? (
                        <div className={"main"} dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        contentObject
                    )}
                    <footer className={'modal_footer'}>
                        {
                            buttonList.map((btn, index) => (
                                <button key={index} className={"update_notice"} onClick={btn.buttonFunc}>{btn.buttonLabel}</button>
                            ))
                        }
                        <button className="update_notice" onClick={() => isOpen(false)}>
                            close
                        </button>
                    </footer>
                </section>
            </div>
        </>);
};

export default Modal;