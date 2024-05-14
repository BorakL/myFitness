import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import FiltersGroups from "../../components/filtersGroups/filtersGroups";
import Loading from "../../components/loading/loading";
import ScrollToTop from "../../components/scrollToTop/scrollToTop";
import Search from "../../components/search/search";
import WorkoutItem from "../../components/workoutItem/workoutItem";
import { getAll } from "../../services";
import "./exploreWorkout.css"

const ExploreWorkout = ({scrollParentRef})=>{
    const[workouts,setWorkouts]=useState([]);
    const[query,setQuery] = useState({limit:13});
    const[currentFilters,setCurrentFilters] = useState({});
    const[total,setTotal] = useState(0);
    const[name,setName] = useState("");
    const[initialLoading,setInitialLoading] = useState(true);
    const[loading,setLoading] = useState(false);
    const timeoutRef = useRef(null);
    const inputRef = useRef(null);

    const loadWorkouts = async(offset=0)=>{ 
        try{
            let workoutsData = await getAll({
                service:"workouts",
                query: {
                    ...query,
                    skip: offset
                }
            });
            setWorkouts(prev=>[...prev, ...workoutsData.data.data])
            setCurrentFilters(workoutsData.data.stats)
            setInitialLoading(false)
            setLoading(false)
            if(offset===0){setTotal(workoutsData.data.total)}
        }catch(error){
            setLoading(false)
            console.log("error",error)
        }
    }

    const textSearch = (e)=>{
        const input = e.target.value
        setName(input) 
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(()=>{
            if(input && input.trim()!==""){
                setWorkouts([])
                setTotal(0)
                setQuery({
                    ...query,
                    name:input
                })
            }else{
                if(query && query.name){
                    delete query["name"]
                    setWorkouts([])
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
            setWorkouts([])
            setTotal(0)
            setName("")
            if(query){
                delete query["name"];
                setQuery({
                    ...query
                })
            } 
        }
    }

    useEffect(()=>{
        if(!loading){
            setLoading(true)
            loadWorkouts();
        }
    },[query])

    return(
        <div className="mainWrapper">
            <div className="exploreHeader">
                <div className="exploreTitle">
                    <h1>Workouts</h1>
                </div>
                <div className="searchBar">
                    <Search 
                        getData={e=>textSearch(e)}
                        inputValue={name}
                        clear={clear}
                        placeholder="Search Workouts"
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
                        setItems={setWorkouts} 
                        scrollParentRef={scrollParentRef}
                        loading={loading}
                    />
                </div>
                <div className="exploreContainer exploreWorkoutContainer">
                    {workouts.length>0 ? 
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={()=>loadWorkouts(workouts.length)}
                    loader={<p key={workouts.length}>Loading...</p>}  
                    hasMore={total>workouts.length}
                    useWindow={false}
                    threshold={250}
                    getScrollParent={()=>scrollParentRef.current}
                    >
                    {
                        workouts.map((w,i)=><WorkoutItem 
                                                id={w._id}
                                                key={w._id}
                                                muscleGroups={w.muscleGroups}
                                                shortDescription={w.shortDescription}
                                                ratingsAverage={w.ratingsAverage}
                                                ratingsQuantity={w.ratingsQuantity}
                                            />)
                    }
                    </InfiniteScroll>
                    :
                    initialLoading || loading ? <Loading/> : <p>No Workouts Found</p>
                    }
                    
                </div>
            </div>
            <ScrollToTop scrollParentRef={scrollParentRef}/>
        </div>
    )
}

export default ExploreWorkout;