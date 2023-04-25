import React, {useState} from "react";
/** CSS **/
import './Notice.css';
/** Component **/

function Notice({notice, searchText, searchType , goEditNotice}) {
    let noticeList = "";
    let returnMap = "";
    /**open Detail**/
    const [modalVisibleId, setModalVisibleId] = useState("")
    const onModalHandler = id => {
        setModalVisibleId(id)
    }
    const onCloseHandler = () => {
        setModalVisibleId("")
    }
    const update = "update"
    /**open Detail**/
    return (
        <tr key={notice.nt_no} className={"detail_" + notice.nt_no}>
            <td onClick={() => goEditNotice(update,notice.nt_no)}>{notice.nt_no}</td>
            <td onClick={() => goEditNotice(update,notice.nt_no)}>{notice.nt_title}</td>
            <td onClick={() => goEditNotice(update,notice.nt_no)}
                style={{textAlign: 'center'}}>{notice.nt_views}</td>
            <td onClick={() => goEditNotice(update,notice.nt_no)}>{notice.reg_date}</td>
        </tr>
    )
}

export default Notice;

