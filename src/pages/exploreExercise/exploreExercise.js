import React, { useEffect, useRef, useState } from "react"; 
import FiltersGroups from "../../components/filtersGroups/filtersGroups";
import { getAll } from "../../services";
import "./exploreExercise.css"
import InfiniteScroll from "react-infinite-scroller"
import ExerciseItem from "../../components/exerciseItem/exerciseItem";
import Search from "../../components/search/search";
import ScrollToTop from "../../components/scrollToTop/scrollToTop";
import Loading from "../../components/loading/loading";

const ExploreExercise = ({scrollParentRef})=>{
    const[exercises,setExercises] = useState([]); 
    const[currentFilters,setCurrentFilters] = useState({}) 
    const[query,setQuery] = useState({limit:24}) 
    const[total,setTotal] = useState(0)  
    const[name,setName] = useState("")
    const[initialLoading,setInitialLoading] = useState(true)
    const timeoutId = useRef()
    const inputRef = useRef()
 

    const loadExercises = async (offset=0)=>{ 
        try{
            let exercisesData = await getAll({
                service:"exercises",
                query:{
                    ...query,
                    skip: offset
                }
            });
            setExercises(prev=>[...prev, ...exercisesData.data.data])
            if(offset===0)setTotal(exercisesData.data.total) 
            setCurrentFilters(exercisesData.data.stats)
            setInitialLoading(false)
        }catch(error){
            console.log("error",error)    
        } 
    } 

    const textSearch = (e)=>{
        clearTimeout(timeoutId.current)
        const input = e.target.value;
        setName(input);
        timeoutId.current = setTimeout(()=>{
            if(input && input.trim()!==""){
                setExercises([]);
                setTotal(0)
                setQuery({
                    ...query,
                    name:input.trim().replace(/\s/g, "-")
                })    
            }else{
                if(query && query.name){
                    delete query["name"];
                    setExercises([]);
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
            setName("")
            setExercises([]);
            setTotal(0)
            if(query){
                delete query["name"];
                setQuery({
                    ...query
                })
            }
        }
    }

    useEffect(()=>{ 
        loadExercises()   
    },[query])

 
    return(
        <div className="mainWrapper">
            <div className="exploreHeader">
                <div className="exploreTitle">
                    <h1>Explore Exercise</h1>
                </div>
                <div className="searchBar">
                    <Search
                        getData={e=>textSearch(e)}
                        inputValue={name}
                        clear={clear}
                        placeholder="Search Exercise"
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
                        setItems={setExercises} 
                        scrollParentRef={scrollParentRef}
                    />
                </div>
                <div className="exploreContainer exploreExerciseContainer">
                    {  
                            exercises.length>0 ? 
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={()=>loadExercises(exercises.length)}
                                    hasMore={total>exercises.length}
                                    loader={<div key={exercises.length}>...loading/</div>}   
                                    useWindow={false}
                                    threshold={250}  
                                    getScrollParent={()=>scrollParentRef.current}
                                >
                                    {exercises.map(e=><ExerciseItem key={e.name} exercise={e}/>)} 
                                </InfiniteScroll>   
                                : 
                                initialLoading ? <Loading/> : <p>No Exercises Found</p>
                    }
                </div> 
            </div> 
            <ScrollToTop scrollParentRef={scrollParentRef}/>
        </div>
    )
} 

export default ExploreExercise;