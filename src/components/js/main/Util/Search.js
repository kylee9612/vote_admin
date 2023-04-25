import React, {useEffect, useState} from "react";


const Search = ({option, search , setSearchText , setSearchType}) => {
    // const {search , setSearchText , setSearchType} = props
    const adminOption = ["ID","Name" , "Phone"];
    const contentOption = ["Title","Content" , "Title+Content"];
    const [searchOption, setSearchOption] = useState(contentOption); // 기본값은 contentOption

    /**search NoticeList List**/
    const onChangeText = (e) => {setSearchText(e.target.value)}
    const onChangeType = (e) => {setSearchType(e.target.value)}

    useEffect( ()=>{
        if(option == "adminOption"){
            setSearchOption(adminOption);
        }else{
            setSearchOption(contentOption);
        }
    },[])

    const optionList = searchOption.map((option) => (
        <option key={option} value={option}>
            {option}
        </option>
    ));

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
                {optionList}
            </select>
            <input className="_searchBar_input" type={"text"} placeholder={"Search"} onChange={onChangeText} onKeyDown={onKeyPress}/>
            <input className="_searchBar_btn" type={"button"} value="▼" onClick={doSearch}/>
        </div>
    )
}
export default Search;
