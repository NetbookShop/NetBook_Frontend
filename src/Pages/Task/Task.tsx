import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import { NavProps } from "../../Utils/Types";
import "./Task.css"
import data from "../../TestData/Task.json"

const TaskPage: React.FC<NavProps> = (props: NavProps) => { 
    let elements = new Map<string, string>()
    const task = data.task
    const user = data.user
    const taskTags = data.task.tags 
    elements.set("Проекты", "/projects")
    elements.set(data.project.name, `/project/${data.project.id}`)
    elements.set(data.task.name, `/task/${data.task.id}`)
    props.setCategory("projects")

    const changeComment = (id: string) => { 

    }

    const deleteComment = (id: string) => { 
        
    }

    return ( 
        <div className="task-root">
            <NavigationMapComponent elements={elements}/>
            <div className="task-container">
                <div className="task-main-info">
                    <div className="task-header">
                        <h1>{task.name}</h1>
                    </div>
                    <h4>Описание</h4>
                    <div className="description-container">
                        {task.description}
                    </div>
                </div>
                <div className="task-metainfo">
                    <h3>Сведения</h3>
                    <hr className="metainfo-border"/>
                    <div className="metainfo-data">
                        <div className="metainfo-assiged">
                            <p className="metainfo-header">Исполнитель</p>
                            {task.assignedTo !== null ?  
                                <div className="right-side">
                                    <img src={task.assignedTo.avatar.fileUrl} alt="" className="avatar-icon"/>
                                    <div>{task.assignedTo.name}</div>
                                </div>
                            : null }
                        </div>
                        <div className="metainfo-tags">
                            <p className="metainfo-header">Тэги</p>
                            {taskTags.map((value) => { 
                                return (
                                    <div className="metainfo-task-tag">
                                        {value}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="metainfo-author">
                            <p className="metainfo-header">Автор</p>
                            {task.author.name}
                        </div>
                        <div>
                            <p className="metainfo-header">Создано</p>
                            {task.createdAt}
                        </div>
                    </div>
                </div>
            </div>
            <div className="activity">
                <div className="comments-container">
                    <div className="create-comment">
                        <img src={user.avatar.fileUrl} alt="" className="profile-image" />
                        <input type="text" className="create-comment-input" placeholder="Добавить коментарий"/>
                    </div>
                    {data.comments.map((value) => {
                        return ( 
                            <div className="comment-container">
                                <img src={value.user.avatar.fileUrl} alt="" className="profile-image"/>
                                <div className="comment-header">
                                    <p>{value.user.name}</p>
                                    <p className="comment-date">{value.createdAt}</p>
                                </div>
                                <div className="comment-text">
                                    {value.text}
                                </div>
                                <div className="comment-actions">
                                    <div onClick={() => changeComment(value.id)} className="change-comment-action">Изменить</div>
                                    <div onAbort={() => deleteComment(value.id)} className="delete-comment-action"></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TaskPage; 
