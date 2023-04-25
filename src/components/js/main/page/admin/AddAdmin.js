import "./AddAdmin.css"
import modal from "../../Util/Modal";
import ReactPortal, {useEffect, useState} from "react";
import axios from "axios";
import Search from "../../Util/Search";
import React from "react";
import Pagination from "../../Util/Pagination";
import Notice from "../notice/Notice";
import AdminList from "./AdminList";
function AddAdmin(props){
    /**search AdminList List**/
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState(0);
    const [Admin, setAdmin] = useState([]);
    /**pageNation**/
    const [curPage, setCurPage] =useState(1);
    const [lastPage, setLastPage] = useState(1);
    /**pageNation**/
    function searchAdminList(){}

    useEffect(() =>{
        let adminList = [];
        const params = {
            "searchText": searchText,
            "searchType": searchType,
            "curPage"   : curPage
        }
            const url = "/api/admin/getAdminList";
            axios.post(url,{params}
            ).then((res)=>{
                setLastPage(res.data.data.lastPage);
                res.data.data.adminList.map((element => {
                    adminList.push(element);
                }))

                setAdmin(adminList)
            }).catch((error)=>{
                alert('error' + error)
            })
    },[searchText, searchType , curPage])

    const submitForm = (event)=>{
        event.preventDefault()
        const url = "/api/admin/addAdmin"
        // adminDTO와 adminDetailDTO를 나눠서 formData 객체에 추가
        const formData = new FormData(event.currentTarget);
        for (let value of formData.values()) {
            console.log(value);
        }

        axios.post(url, formData,{
            headers: {
                "Content-Type": `application/json`, // application/json 타입 선언
            },
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    const content = <form className={"admin-form"} onSubmit={submitForm} encType="multipart/form-data">
        <input type={"number"} placeholder={"조합 번호"} name={"ad_id"}/>
        <input type={"text"} placeholder={"성명"} name={"ad_name"}/>
        <input title={"password"} placeholder={"비밀번호"} name={"ad_pw"}/>
        <input type={"number"} placeholder={"OTP 인증"} name={"ad_otp_code"}/>
        <button type={"submit"} >아이디 생성</button>
    </form>
    return(
        <>
            <h1>조합원 추가</h1>
            <div className="header_wrap">
                <div className="_header">
                    {/*<div className="notice_header_title"><h2>Notice</h2></div>*/}
                    <div className="_header_sub">
                        {/*<button onClick={()=>goEditNotice("insert",0 )}>추가</button>*/}
                        <Search option={"adminOption"}
                                search={searchAdminList}
                                setSearchText={setSearchText}
                                setSearchType={setSearchType}/>
                    </div>
                </div>
            </div>
            {/*body*/}
            <div className={"body_warp"}>
                <table className="admin_table">
                    <colgroup>
                        <col style={{width: '5%'}}/>
                        <col style={{width: '30%'}}/>
                        <col style={{width: '30%'}}/>
                        <col style={{width: '7%'}}/>
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
                    {
                        Admin.map((element) => (
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