import React, { useState } from "react";
import Modal from "../../Util/Modal";
import axios from "axios";

function AdminList(props) {
    const { admin, searchText, searchType, goEditAdmin } = props;
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleEditAdmin = () => {
        handleModalClose();
        goEditAdmin("edit", admin.ad_idx);
    };

    const handleDeleteAdmin = () => {
        const url = "/api/admin/deleteAdmin";
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
        <tr className={"admin_table_tr"} onClick={handleModalOpen}>
            <td>{admin.ad_idx}</td>
            <td>{admin.ad_id}</td>
            <td>{admin.ad_name}</td>
            <td>{admin.ad_level}</td>
            {modalOpen && (
                <Modal header={"조합원"} onClose={handleModalClose}>
                    <div>
                        <button onClick={handleEditAdmin}>Edit Admin</button>
                        <button onClick={handleDeleteAdmin}>Delete Admin</button>
                    </div>
                </Modal>
            )}
        </tr>
    );
}

export default AdminList;