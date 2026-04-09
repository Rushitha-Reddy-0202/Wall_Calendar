import {useState, useEffect} from "react"
import themes from "../themes"

function Calendar({date,setDate,start,end,setStart,setEnd,notes}){
    // use states
    const [show,setShow]=useState(false)
    //arrays
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    // dates and days
    const year=date.getFullYear()
    const month=date.getMonth()
    const firstDay=new Date(year,month,1).getDay()
    const totalDays=new Date(year,month+1,0).getDate()
    const theme=themes[month]
    const today=new Date()
    // calendar array
    let arr=[]
    const prevDays=new Date(year,month,0).getDate()
    let totalCells=(firstDay+totalDays>35)?42:35
    // previous month
    for(let i=0;i<firstDay;i++){
    arr.push({day:prevDays-firstDay+i+1,type:"prev"})
    }
    // current month
    for(let i=1;i<=totalDays;i++){
    arr.push({day:i,type:"current"})
    }
    // next month
    let nextDay=1
    while(arr.length<totalCells){
    arr.push({day:nextDay++,type:"next"})
    }
    // functions
    const handleClick=(d)=>{
        let m=month
        let y=year
        if(d.type==="prev") m=month-1
        if(d.type==="next") m=month+1
        const clicked=new Date(y,m,d.day)
        if(!start||start&&end){
            setStart(clicked)
            setEnd(null)
        }
        else{
            if(clicked<start){
                setEnd(start)
                setStart(clicked)
            }
            else{
                setEnd(clicked)
            }
        }
    }
    //html
    return(
        <div className={`w-full h-full flex flex-col p-2 md:p-3 transition-all duration-300 relative ${themes[month].color1}`}>
            <div className={`relative flex items-center mb-3 ${themes[month].light}`}>
                <div className="flex-1 flex justify-center">
                    <button 
                        className={`w-10 h-10 hidden md:block absolute left-2 px-2 py-2 mt-2 rounded-full ${theme.color}`}
                        onClick={()=>setDate(new Date(year,month-1,1))}
                    >
                        {"<"}
                    </button>
                    <div
                        onClick={() => setShow(!show)}
                        className="text-lg font-semibold tracking-wide cursor-pointer text-center flex flex-col"
                    >
                        <span>{months[month]}</span>
                        <span>{year}</span>
                    </div>
                    <button 
                        className={`w-10 h-10 hidden md:block absolute right-2 px-2 py-2 mt-2 rounded-full ${theme.color}`}
                        onClick={()=>setDate(new Date(year,month+1,1))}
                    >
                        {">"}
                    </button>
                </div>
                {show&&(
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded p-2 md:p-3 max-h-56 overflow-y-auto overflow-x-hidden z-10 w-56">
                        <div className="flex justify-between items-center mb-3">
                        <button
                            onClick={() => setDate(new Date(year-1,month,1))}
                            className="px-2 py-1 hover:bg-gray-200 rounded"
                        >
                            -
                        </button>
                        <span className="font-medium">{year}</span>
                        <button
                            onClick={() => setDate(new Date(year+1,month,1))}
                            className="px-2 py-1 hover:bg-gray-200 rounded"
                        >
                            +
                        </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                        {months.map((m, i)=>(
                            <div
                            key={i}
                            onClick={()=>{
                                setDate(new Date(year,i,1))
                                setShow(false)
                            }}
                            className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                            >
                            {m.slice(0, 3)}
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-7 text-center text-[10px] md:text-sm mb-2 text-gray-500">
                {days.map((d,i)=>(
                    <div key={i} className={`${d==="Sun" || d==="Sat"?"text-red-400":"text-black"}`}>
                        {d}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-2 md:flex-1">
                {arr.map((d,i)=>{
                    let base=new Date(year,month,d.day)
                    if(d.type==="prev") base=new Date(year,month-1,d.day)
                    if(d.type==="next") base=new Date(year,month+1,d.day)
                    let current=base
                    let isToday=current.getDate()===today.getDate() && current.getMonth()===today.getMonth() &&current.getFullYear()===today.getFullYear()
                    let isStart=start&&current.toDateString()===start.toDateString()
                    let isEnd=end&&current.toDateString()===end.toDateString()
                    let isBetween=start&&end&&current>start&&current<end
                    let hasNote=notes.some(n=>{
                        let s=new Date(n.start)
                        let e=new Date(n.end)
                        let inRange=current>=s&&current<=e
                        return inRange&&d.type==="current"
                    })
                    return(
                        <div
                            key={i}
                            onClick={()=>handleClick(d)}
                            className={`h-8 md:h-10 rounded-full flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition 
                            ${d.type==="current"?"":"text-gray-400"}
                            ${isStart||isEnd?`${theme.color} text-white`:""}
                            ${isBetween?theme.light:""}
                            ${isToday&&!isStart&&!isEnd?"border-2 border-gray-800 rounded-full":""}
                            `}
                        >
                            <div>{d.day}</div>
                            {hasNote&&<div className={`w-1.5 h-1.5 rounded-full mt-1 ${theme.color}`}></div>}
                        </div>
                    )
                })}
            </div>
            <div className="absolute bottom-2 right-2 flex gap-2 md:hidden">
                <button
                    onClick={()=>setDate(new Date(year,month-1,1))}
                    className={`w-8 h-8 flex items-center justify-center rounded-full shadow ${theme.color} text-white`}
                >
                    {"<"}
                </button>
                <button
                    onClick={()=>setDate(new Date(year,month+1,1))}
                    className={`w-8 h-8 flex items-center justify-center rounded-full shadow ${theme.color} text-white`}
                >
                    {">"}
                </button>
            </div>
        </div>
    )
}

export default Calendar