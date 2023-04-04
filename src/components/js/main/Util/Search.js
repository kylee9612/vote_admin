import React, {useState} from "react";


const Search = ({search , setSearchText , setSearchType}) => {
    // const {search , setSearchText , setSearchType} = props

    /**search NoticeList List**/
    const onChangeText = (e) => {setSearchText(e.target.value)}
    const onChangeType = (e) => {setSearchType(e.target.value)}

    const doSearch = () =>{
        search()
    }
    const onKeyPress = (e) => {
        if(e.key == 'Enter'){
            search()
        }
    }
    /**search NoticeList List**/
    return (
        <div className=" _searchBar">
            <select className="_searchBar_select" onChange={onChangeType} >
                <option value="0" selected>Title</option>
                <option value="1"         >Content</option>
                <option value="2"         >Title+Content</option>
            </select>
            <input className="_searchBar_input" type={"text"} placeholder={"Search"} onChange={onChangeText} onKeyDown={onKeyPress}/>
            <input className="_searchBar_btn" type={"button"} value="▼" onClick={doSearch}/>
        </div>
    )
}
export default Search;
