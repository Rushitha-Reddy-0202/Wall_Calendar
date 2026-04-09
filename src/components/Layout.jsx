import {useState,useEffect} from "react"
import Image from "./Image"
import Calendar from "./Calendar"
import Notes from "./Notes"

function Layout({date,setDate,start,end,setStart,setEnd,notes,setNotes,nextDate,anim,dir}){
    // use states
    const [isMobile,setIsMobile]=useState(window.innerWidth<768)
    // use effects
    useEffect(()=>{
        const handle=()=>setIsMobile(window.innerWidth<768)
        window.addEventListener("resize",handle)
        return()=>window.removeEventListener("resize",handle)
    },[])
    if(isMobile){
        return(
            <div className="relative w-full h-full">
                {/* back */}
                <div className="absolute w-full h-full flex flex-col md:flex-row bg-white z-0 pointer-events-none">
                    <div className="h-[50%]">
                        <Image month={nextDate.getMonth()}/>
                    </div>
                    <div className="h-[50%] flex gap-2 p-2">
                        <div className="w-2/5 overflow-hidden">
                            <Notes notes={notes} setNotes={setNotes} start={start} end={end} setStart={setStart} setEnd={setEnd} date={nextDate}/>
                        </div>
                        <div className="w-3/5 overflow-hidden">
                            <Calendar date={nextDate} setDate={()=>{}} start={start} end={end} setStart={setStart} setEnd={setEnd} notes={notes}/>
                        </div>
                    </div>
                </div>
                {/* front */}
                <div className={`absolute w-full h-full flex flex-col md:flex-row bg-white z-10 ${anim?(dir==="next"?"animate-next":"animate-prev"):""}`}>
                    <div className="h-[50%]">
                        <Image month={date.getMonth()}/>
                    </div>
                    <div className="h-[50%] flex gap-2 p-2">
                        <div className="w-1/2">
                            <Notes notes={notes} setNotes={setNotes} start={start} end={end} setStart={setStart} setEnd={setEnd} date={date}/>
                        </div>
                        <div className="w-1/2">
                            <Calendar date={date} setDate={setDate} start={start} end={end} setStart={setStart} setEnd={setEnd} notes={notes}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className="relative w-full h-full">
            {/* back */}
            <div className="absolute w-full h-full flex flex-col md:flex-row bg-white z-0 pointer-events-none">
                <div className="w-[35%]">
                    <Image month={nextDate.getMonth()}/>
                </div>
                <div className="w-[65%] flex flex-col">
                    <div className="h-[65%]">
                        <Calendar date={nextDate} setDate={()=>{}} start={start} end={end} setStart={setStart} setEnd={setEnd} notes={notes}/>
                    </div>
                    <div className="h-[35%]">
                        <Notes notes={notes} setNotes={setNotes} start={start} end={end} setStart={setStart} setEnd={setEnd} date={nextDate}/>
                    </div>
                </div>
            </div>
            {/* front */}
            <div className={`absolute w-full h-full flex flex-col md:flex-row bg-white z-10 ${anim?(dir==="next"?"animate-next":"animate-prev"):""}`}>
                <div className="w-[35%]">
                    <Image month={date.getMonth()}/>
                </div>
                <div className="w-[65%] flex flex-col">
                    <div className="h-[65%]">
                        <Calendar date={date} setDate={setDate} start={start} end={end} setStart={setStart} setEnd={setEnd} notes={notes}/>
                    </div>
                    <div className="h-[35%]">
                        <Notes notes={notes} setNotes={setNotes} start={start} end={end} setStart={setStart} setEnd={setEnd} date={date}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout