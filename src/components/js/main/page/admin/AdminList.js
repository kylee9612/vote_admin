import React, {useState} from "react";

function AdminList({admin, searchText, searchType , goEditAdmin}){
    let adminList = "";
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
        <tr key={admin.ad_idx} className={"detail_" + admin.ad_idx}>
            <td onClick={() => goEditAdmin(update,admin.ad_idx)}>{admin.ad_idx}</td>
            <td onClick={() => goEditAdmin(update,admin.ad_idx)}>{admin.ad_id}</td>
            <td onClick={() => goEditAdmin(update,admin.ad_idx)}>{admin.ad_name}</td>
            <td onClick={() => goEditAdmin(update,admin.ad_idx)}>{admin.ad_level}</td>
        </tr>
    )
}

export default AdminList;