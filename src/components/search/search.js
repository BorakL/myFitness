import React, { useEffect } from "react";
import "./search.css";
import {RxMagnifyingGlass} from "react-icons/rx"
import {IoMdClose} from "react-icons/io"

const Search = ({
    getData,
    inputValue,
    clear,
    placeholder,
    className,
    inputRef
})=>{
    return(
        <div className={`searchInput ${className}`}>
            <span className="searchIcon">
                <RxMagnifyingGlass/>
            </span>
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={getData}
                placeholder={placeholder} 
            />
            {inputValue && <span onClick={clear} className="clearIcon">
                <IoMdClose/>
            </span>}
        </div>
    )
}

export default Search;