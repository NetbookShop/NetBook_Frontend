import "./Search.css"
import searchIcon from "../../Static/Images/search-icon.png"
import data from "../../TestData/Search.json"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type propsType = {
    width: number,
    placeholder?: string, 
    handleSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void, 
    clildren?: React.ReactNode
}

const SearchComponent: React.FC<propsType> = (props: propsType) => { 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [foundTasks, setFoundTasks] = useState<Array<any>>(data)
    const navigate = useNavigate()

    const handleInputClick = () => {
        setIsMenuOpen(true);
    };

    let handleSearchChange
    if (!props.handleSearchChange) { 
        handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
            event.preventDefault()
            data.map((value) => {
                if (event.target.value === value.projectName) { 
                    setFoundTasks([...foundTasks, value])
                }
            })
        }
    } else { 
        handleSearchChange = props.handleSearchChange
    } 
    let children: React.ReactNode; 

    if (!props.clildren) { 
        children = ( 
            <div>
                <div className="search-menu-header">
                    <h2>Задания </h2>
                    <span className="tasks-counter">{foundTasks.length}</span>
                </div>
                {foundTasks.map((value) => { 
                    return (
                        <div className="found-task" onClick={() => navigate("/task/" + value.id)}>
                            <img src={value.projectIcon.fileUrl} alt="" className="project-icon"/>
                            <div className="found-task-description">
                                <h4>{value.title}</h4>
                                <p>{value.projectName}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    } else { 
        children = props.clildren
    }

    const handleClickOutside = () => {
        setIsMenuOpen(false);
    };  
    return (
        <div className="search-root" style={{width: props.width}}>
            <img src={searchIcon} alt="" className="serach-button" width={20} height={20}/>
            <input 
                type="text"
                className="search-input"
                placeholder={props.placeholder || 'Поиск'}
                onClick={handleInputClick}
                onInput={handleSearchChange}
            />
            {isMenuOpen && (
                <div className="search-menu" onClick={handleClickOutside}>
                    {children}
                </div>
            )}
        </div>
    )
}

export default SearchComponent 
