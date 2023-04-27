import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Search from "../../Util/Search";
import Pagination from "../../Util/Pagination";
import AdminInfo from "./AdminInfo";
import Modal from "../../Util/Modal";
import EditAdmin from "./EditAdmin";

function AddAdmin(prop) {
    /**search**/
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState(0);
    const [Admin, setAdmin] = useState([]);
    /**pageNation**/
    const [curPage, setCurPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    /**pageNation**/
    const [modalProp, setModalProp] = useState("");
    const [modalShow, setModalShow] = useState(false);

    let mode= "";
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
        const url = "/api/admin/admin/list";
        axios
            .get(url, { params })
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
    function handleSubmit(){
        const form = document.getElementById('admin-form');
        const url = "/api/admin/admin";
        const formData = new FormData(form);

        if(mode == "create"){
            axios.post(url,formData)
                .then((e)=>{alert("관리자 생성이 완료되었습니다.")})
                .catch((e)=>alert("관리자 생성이 실패했습니다. \n 관리자에게 문의 하세요. \nError code: "))
        }else{
            axios.put(url,formData)
                .then((e)=>{alert("관리자 수정이 완료되었습니다.")})
                .catch((e)=>alert("관리자 수정이 실패했습니다. \n 관리자에게 문의 하세요. \nError code: "))
        }
    }

    const modalHandler = (option, data) => {
        mode = option;
        let header
        let contentObject
        let buttonList = [];

        if(mode == "edit"){
            header = `<h3>`+"관리자 수정"+`</h3>`;
            contentObject = <EditAdmin mode={mode} admin={data}  />;
            buttonList = [{
                    buttonLabel : "Edit",
                    buttonFunc: () => handleSubmit()
                }]
        }else if(mode == "insert"){
            header = `<h3>`+"관리자 생성"+`</h3>`;
            contentObject = <EditAdmin mode={mode} admin={null}  />;
            buttonList = [{
                buttonLabel : "Create",
                buttonFunc: () => handleSubmit()
            }]
        }

        const prop = {
            "header" : header,
            "contentObject" : contentObject,
            "buttonList" : buttonList
        }

        setModalProp(prop)
        setModalShow(true)
    }

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
                        <button onClick={()=>modalHandler("insert")}>추가</button>
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
                        <AdminInfo
                            key={element.ad_idx}
                            admin={element}
                            searchText={searchText}
                            searchType={searchType}
                            clickEvent={()=>modalHandler("edit",element)}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            {
                modalShow === true ? <Modal isOpen={setModalShow} props={modalProp}></Modal> : ""
            }
            <Pagination
                curPage={curPage}
                setCurPage = {setCurPage}
                lastPage={lastPage}
            />
        </>
    )
}

export default AddAdmin