import React, { useState } from "react";
import Modal from "../../Util/Modal";
import axios from "axios";

function AdminInfo(props) {
    const { admin, searchText, searchType, clickEvent } = props;

    const [list, setList] = useState([]);
    const [modalProp, setModalProp] = useState("");
    const [modalShow, setModalShow] = useState(false);

    // const handleModalOpen = () => {
    //     setModalOpen(true);
    // };
    //
    // const handleModalClose = () => {
    //     setModalOpen(false);
    // };

    const handleEditAdmin = () => {
        // handleModalClose();
        clickEvent("edit", admin.ad_idx);
    };
    // back 에서 만들어 줘야함
    const handleDeleteAdmin = () => {
        const url = "/api/admin/admin/deleteAdmin";
        axios
            .post(url, { ad_idx: admin.ad_idx })
            .then((res) => {
                alert("Success");
                window.location.reload();
            })
            .catch((error) => {
                alert("error" + error);
            });
    };

    return (
        <tr className={"admin_table_tr"} onClick={clickEvent}>
            <td>{admin.ad_idx} </td>
            <td>{admin.ad_id}</td>
            <td>{admin.ad_name}</td>
            <td>{admin.ad_level}</td>
        </tr>
    );
}

export default AdminInfo;