import {useState,useEffect} from "react"
import themes from "../themes"

function Notes({notes,setNotes,start,end,setStart,setEnd,date}){
    // use states
    const [text,setText]=useState("")
    // functions
    const addNote=()=>{
        if(!text||!start||!end)return
        setNotes([...notes,{text,start,end}])
        setText("")
    }
    const delNote=(i)=>{
        let arr=[...notes]
        arr.splice(i,1)
        setNotes(arr)
    }
    const selectNote=(n)=>{
        setStart(new Date(n.start))
        setEnd(new Date(n.end))
    }
    const year=date.getFullYear()
    const month=date.getMonth()
    let filtered=notes.filter(n=>{
        let s=new Date(n.start)
        let e=new Date(n.end)
        let startInMonth=s.getMonth()===month&&s.getFullYear()===year
        let endInMonth=e.getMonth()===month&&e.getFullYear()===year
        let cross=(s<=new Date(year,month+1,0)&&e>=new Date(year,month,1))
        return startInMonth||endInMonth||cross
    })
    //html
    return(
        <div className={`w-full h-full p-2 flex flex-col text-xs md:text-base ${themes[month].color1}`}>
            <p className={`text-center text-base font-semibold md:text-2xl m-2 ${themes[month].light}`}>Notes</p>
            <div className="m-2 flex flex-col md:flex-row gap-2">
                <input 
                    value={text} 
                    placeholder="write notes here..." 
                    onChange={(e)=>setText(e.target.value)} 
                    className="border p-2 text-[5px] flex-1 md:text-sm"
                />
                <button 
                    disabled={!start||!end} 
                    onClick={addNote} 
                    className={`w-full md:w-auto px-3 py-1 text-black ${themes[month].color} rounded disabled:opacity-90`}
                >
                    add
                </button>
            </div>
            <div className="flex-1 overflow-auto">
                {filtered.map((n,i)=>(
                    <div key={i} onClick={()=>selectNote(n)} className="flex justify-between items-center mb-2 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition p-2 cursor-pointer border-l-4 border-gray-400">
                        <div className="flex flex-col text-sm">
                            <span className="font-medium">{n.text}</span>
                            <span className="text-xs text-gray-500">{new Date(n.start).toLocaleDateString()} - {new Date(n.end).toLocaleDateString()}</span>
                        </div>
                        <button onClick={(e)=>{e.stopPropagation();delNote(i)}} className="text-red-500">❌</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notes