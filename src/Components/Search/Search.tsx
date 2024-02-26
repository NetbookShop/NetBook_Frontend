import "./Search.css"
import searchIcon from "../../Static/Images/search-icon.png"

type propsType = { width: number, placeholder?: string}

const SearchComponent: React.FC<propsType> = (props: propsType) => { 
    return (
        <div className="search-root" style={{width: props.width}}>
            <img src={searchIcon} alt="" className="serach-button" width={22} height={22}/>
            <input type="text" className="serach-input" placeholder={props.placeholder === undefined ? "Поиск" : props.placeholder}/>
        </div>
    )
}

export default SearchComponent 
