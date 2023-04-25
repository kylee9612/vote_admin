import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../../Util/Search";
import Pagination from "../../Util/Pagination";
import AdminList from "./AdminList";
import Modal from "../../Util/Modal";
import EditAdmin from "./EditAdmin";

function AddAdmin() {
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState(0);
    const [Admin, setAdmin] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedAdmin, setSelectedAdmin] = useState({});

    useEffect(() => {
        searchAdminList();
    }, [searchText, searchType, curPage]);

    function searchAdminList() {
        let adminList = [];
        const params = {
            searchText: searchText,
            searchType: searchType,
            curPage: curPage,
        };
        const url = "/api/admin/getAdminList";
        axios
            .post(url, { params })
            .then((res) => {
                setLastPage(res.data.data.lastPage);
                res.data.data.adminList.map((element) => {
                    adminList.push(element);
                });
                setAdmin(adminList);
            })
            .catch((error) => {
                alert("error" + error);
            });
    }

    const submitForm = (type, admin) => {
        setModalType(type);
        setSelectedAdmin(admin);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedAdmin({});
    };

    const editAdmin = (
        <EditAdmin admin={selectedAdmin} closeModal={closeModal} />
    );

    return (
        <>
            <h1>조합원 추가</h1>
            <div className="header_wrap">
                <div className="_header">
                    <div className="_header_sub">
                        <Search
                            option={"adminOption"}
                            search={searchAdminList}
                            setSearchText={setSearchText}
                            setSearchType={setSearchType}
                        />
                    </div>
                </div>
            </div>
            <div className={"body_warp"}>
                <table className="admin_table">
                    <colgroup>
                        <col style={{ width: "5%" }} />
                        <col style={{ width: "30%" }} />
                        <col style={{ width: "30%" }} />
                        <col style={{ width: "7%" }} />
                    </colgroup>
                    <thead className={"admin_table_head"}>
                    <tr>
                        <th>Idx</th>
                        <th>ID</th>
                        <th>name</th>
                        <th>level</th>
                    </tr>
                    </thead>
                    <tbody className={"admin_table_body"}>
                    {Admin.map((element) => (
                        <AdminList
                            key={element.ad_idx}
                            admin={element}
                            searchText={searchText}
                            searchType={searchType}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                curPage={curPage}
                setCurPage = {setCurPage}
                lastPage={lastPage}
            />
        </>
    )
}

export default AddAdmin