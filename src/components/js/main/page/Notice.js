import React, {useEffect, useState} from "react";
/** CSS **/
import './NoticeList.css';
/** Component **/
import Modal from "../Util/Modal";
import axios from "axios";

function Notice({notice, searchText, searchType}) {
    let noticeList = "";
    let returnMap = "";
    /**open Detail**/
    const [modalVisibleId, setModalVisibleId] = useState("")
    // const [id , setId] = useState();
    const onModalHandler = id => {
        // setId(e);
        console.log(id)
        const url = "/api/notice/increaseViews"
        const params = {
            "nt_no" : id
        }
        axios.post(url,params);
        setModalVisibleId(id)
    }
    const onCloseHandler = () => {
        setModalVisibleId("")
    }

    /**open Detail**/
    return (
        <tr key={notice.nt_no} className={"detail_" + notice.nt_no}>
            <td onClick={() => onModalHandler(notice.nt_no)}>{notice.nt_no}</td>
            <td onClick={() => onModalHandler(notice.nt_no)}>{notice.nt_title}</td>
            <td onClick={() => onModalHandler(notice.nt_no)}
                style={{textAlign: 'center'}}>{notice.nt_views}</td>
            <td onClick={() => onModalHandler(notice.nt_no)}>{notice.reg_date}</td>

            <Modal id={notice.nt_no}
                   modalVisibleId={modalVisibleId}
                   setModalVisibleId={onCloseHandler}
                   header={notice.nt_title}
                   contents={notice.nt_contents}
                   date={notice.reg_date}
                   count={notice.nt_views}
            />
        </tr>
    )
}

export default Notice;

