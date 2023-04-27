import "./AddAdmin.css";
import React, {useEffect, useImperativeHandle, useState} from "react";
import axios from "axios";

function EditAdmin(props, ref) {
    const {mode, admin , handleSubmit} = props;
    const defaultAdmin = {
        ad_idx: "",
        ad_id: "",
        ad_pw: "",
        ad_name: "",
        ad_level: "",
    }
    const currentAdmin = (admin !== null ? admin : defaultAdmin)
    // const handleSubmit = (e) => {
    //     alert(handleSubmit);
    //     e.preventDefault();
    //     const url = "/api/admin/admin";
    //     const formData = new FormData(e.currentTarget);
    //     if(mode == "create"){
    //         axios.post(url,formData)
    //             .then((e)=>{alert("관리자 생성이 완료되었습니다.")})
    //             .catch((e)=>alert("관리자 생성이 실패했습니다. \n 관리자에게 문의 하세요. \nError code: "))
    //     }else{
    //         axios.put(url,formData)
    //             .then((e)=>{alert("관리자 수정이 완료되었습니다.")})
    //             .catch((e)=>alert("관리자 수정이 실패했습니다. \n 관리자에게 문의 하세요. \nError code: "))
    //     }
    // }


    return (
        <form className={"admin-form"} id={"admin-form"} onSubmit={handleSubmit}>
            <table>
                <tbody>
                <input type={"hidden"} name={"ad_idx"} value={currentAdmin.ad_idx}/>
                <tr>
                    <th>ID:</th>
                    <td><input type="text" name="ad_id" value={currentAdmin.ad_id} /></td>
                </tr>
                <tr>
                    <th>Password:</th>
                    <td><input type="password" name="ad_pw" value={currentAdmin.ad_pw} /></td>
                </tr>
                <tr>
                    <th>Name:</th>
                    <td><input type="text" name="ad_name" value={currentAdmin.ad_name}/></td>
                </tr>
                <tr>
                    <th>Level:</th>
                    <td><input type="text" name="ad_level" value={currentAdmin.ad_level} /></td>
                </tr>
                </tbody>
            </table>
        </form>
    );
}

export default EditAdmin;