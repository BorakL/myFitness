import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import textFormating from "../../utilies";
import Filter from "../filter/filter"; 
import {SlArrowUp} from "react-icons/sl"
import {SlArrowDown} from "react-icons/sl"
import "./filtersGroups.css"

const FiltersGroups = ({currentFilters, setQuery, query, setTotal, setItems, scrollParentRef, loading})=>{
    const[hiddenFilters,setHiddenFilters]=useState({})   

    useEffect(()=>{
        let hiddenFiltersTmp = {...hiddenFilters}
        let filtersGroups = Object.keys(currentFilters);
        filtersGroups.forEach(filter => hiddenFiltersTmp[filter]=false)
        setHiddenFilters(hiddenFiltersTmp)
    },[])

    const changeFilter = (filter, filterGroup )=>{
        setItems([]);
        setTotal(0)
        if(query[filterGroup]){
            let filters = query[filterGroup].split("+");
            let index = filters.indexOf(filter._id)
            index>-1 ? filters.splice(index,1) : filters.push(filter._id)
            if(filters.length>0){
                setQuery({...query, [filterGroup]:filters.join("+")}) 
            }else{
                let newQuery = {...query}
                delete newQuery[filterGroup];
                setQuery(newQuery) 
            }
            
        }else{
            setQuery({...query, [filterGroup]:filter._id}) 
        }  
        scrollParentRef.current.scrollTop=0;
    } 

    const getFiltersGroups = ()=>{
        const filtersGroups = Object.keys(currentFilters); 
        return filtersGroups.map(group => {
            return (
                <div key={group} className="filterGroup">
                    <div className="filterGroupTitle">
                        <h3>{textFormating(group)}</h3>
                        <div 
                            onClick={()=>setHiddenFilters({...hiddenFilters, [group]:!hiddenFilters[group]})}
                            className="hiddeIcon"
                        >
                            {hiddenFilters[group] ? <SlArrowUp/> : <SlArrowDown/>}
                        </div>
                    </div>
                    <div className={!hiddenFilters[group] ? "hideFilters" : ""}>
                    {
                        currentFilters[group].map(f => 
                                <Filter
                                    key={f._id}  
                                    query={query}  
                                    filterGroup={group} 
                                    filter={f}
                                    changeFilter={changeFilter}
                                    setQuery={setQuery}
                                    setTotal={setTotal}
                                    setItems={setItems}
                                    loading={loading}
                                /> )
                    }
                    </div>
                </div>
            )
        })
    }
    
    return(
        <> 
        {getFiltersGroups()}
        </>
    )
 
}


export default FiltersGroups