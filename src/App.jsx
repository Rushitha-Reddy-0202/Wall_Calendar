import {useState,useEffect} from "react"
import Layout from "./components/Layout"

function App(){
    //use states
    const [dir,setDir]=useState("next")
    const [date,setDate]=useState(new Date())
    const [nextDate,setNextDate]=useState(date)
    const [anim,setAnim]=useState(false)
    const [start,setStart]=useState(null)
    const [end,setEnd]=useState(null)
    const [notes,setNotes]=useState(()=>{
        const data=localStorage.getItem("notes")
        return data?JSON.parse(data):[]
    })
    // use effects
    useEffect(()=>{
        localStorage.setItem("notes",JSON.stringify(notes))
    },[notes])
    // functions
    const month=date.getMonth()
    const changeDate=(d)=>{
        setDir(d>date?"next":"prev")
        setNextDate(d)
        setAnim(true)
        setTimeout(()=>{
        setDate(d)
        setAnim(false)
        },400)
    }
    // html
    return(
        <div 
            className="relative w-screen h-screen bg-gray-200 flex items-center justify-center p-3 md:p-0"
            onClick={()=>{setStart(null);setEnd(null)}}
        >
            {/* top rings */}
            <div className="absolute top-1 md:top-[4%] left-1/2 -translate-x-1/2 flex gap-4 z-20">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-gray-600 rounded-full shadow"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-gray-600 rounded-full shadow"></div>
            </div>
            {/* main card */}
            <div 
                className={`parent mt-2 md:mt-0 w-[90%] h-[90%] md:w-[85%] md:h-[85%]} rounded-xl md:shadow-2xl shadow-lg overflow-hidden`}
                onClick={(e)=>e.stopPropagation()}
            >
                <Layout 
                    date={date}
                    setDate={changeDate}
                    start={start}
                    end={end}
                    setStart={setStart}
                    setEnd={setEnd}
                    notes={notes}
                    setNotes={setNotes}
                    nextDate={nextDate}
                    anim={anim}
                    dir={dir}
                />
            </div>
        </div>
    )
}

export default App