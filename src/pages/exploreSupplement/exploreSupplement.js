import React, { useEffect, useRef, useState } from "react"
import { getAll } from "../../services"
import InfiniteScroll from "react-infinite-scroller"
import ScrollToTop from "../../components/scrollToTop/scrollToTop"
import FiltersGroups from "../../components/filtersGroups/filtersGroups"
import Search from "../../components/search/search"
import Loading from "../../components/loading/loading"
import SupplementItem from "../../components/supplementItem/supplementItem"
import "./exploreSupplement.css"

const ExploreSupplement = ({scrollParentRef})=>{
    const[supplements,setSupplements]=useState([])
    const[query,setQuery]=useState({limit:10})
    const[currentFilters,setCurrentFilters]=useState({})
    const[total,setTotal]=useState(0)
    const[initialLoading,setInitialLoading]=useState(true)
    const timeoutRef = useRef();
    const inputRef = useRef(null);
    const[name,setName] = useState("")

    const loadSupplements = async (offset=0)=>{
        try{
            const supplementsData = await getAll({
                service:"supplements",
                query: {
                    ...query,
                    skip: offset
                }
            }) 
            setSupplements(prev=>[...prev,...supplementsData.data.data])
            setCurrentFilters(supplementsData.data.stats)
            setInitialLoading(false)
            if(offset===0){setTotal(supplementsData.data.total)}
        }catch(error){
            console.log("error",error)
        }
    }  

    const textSearch = (e)=>{
        const input = e.target.value;
        setName(input)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(()=>{
            if(input && input.trim()!==""){
                setSupplements([])
                setTotal(0)
                setQuery({
                    ...query,
                    name: input
                })
            }else{
                if(query && query.name){
                    delete query["name"]
                    setSupplements([])
                    setTotal(0)
                    setQuery({
                        ...query
                    })
                }
            }
        },600)
    }

    const clear = ()=>{
        if(name!==""){
            setSupplements([])
            setTotal(0)
            setName("")
            if(query){
                delete query["name"]
                setQuery({
                    ...query
                })
            }
        }
    }

    useEffect(()=>{
        loadSupplements();
    },[query])

    return(
        <div className="mainWrapper">
            <div className="exploreHeader">
                <div className="exploreTitle">
                    <h1>Explore Supplements</h1>
                </div>
                <div className="searchBar">
                    <Search
                        getData={e=>textSearch(e)}
                        inputValue={name}
                        clear={clear}
                        placeholder="Search Supplements"
                        inputRef={inputRef}
                        className
                    />
                </div>
            </div>
            <div className="exploreMain">
                <div className="sidebar">
                    <FiltersGroups
                        currentFilters={currentFilters}
                        query={query}
                        setQuery={setQuery}
                        setTotal={setTotal}
                        setItems={setSupplements}
                        scrollParentRef={scrollParentRef}
                    />
                </div>
                <div className="exploreContainer exploreSupplementContainer">
                {supplements.length>0 ?
                    <InfiniteScroll
                        pageStart={0} 
                        loadMore={()=>loadSupplements(supplements.length)}
                        hasMore={total>supplements.length}
                        loader={<div key={supplements.length}>Loading...</div>}
                        useWindow={false}
                        threshold={250}
                        getScrollParent={()=>scrollParentRef.current}
                    >
                        {supplements.map(s=><SupplementItem key={s.name} supplement={s}/>)}
                    </InfiniteScroll>
                    :   
                    initialLoading ? <Loading/> : <p>No Supplements Found</p>
                } 
                </div>
            </div>
            <ScrollToTop scrollParentRef={scrollParentRef}/>
        </div>
    )
}

export default ExploreSupplement;