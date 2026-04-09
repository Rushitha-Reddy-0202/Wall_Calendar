import themes from "../themes"

function Image({month}){
    const theme=themes[month]
    // html
    return(
        <div className="w-full h-full">
            <img src={theme.img} className="w-full h-full object-cover"/>
        </div>
    )
}

export default Image