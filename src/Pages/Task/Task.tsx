import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import { NavProps } from "../../Utils/Types";
import "./Task.css"
import data from "../../TestData/Task.json"
import { useState } from "react";

const TaskPage: React.FC<NavProps> = (props: NavProps) => { 
    let elements = new Map<string, string>()
    const task = data.task
    const user = data.user
    const taskTags = data.task.tags 
    elements.set("Проекты", "/projects")
    elements.set(data.project.name, `/project/${data.project.id}`)
    elements.set(data.task.name, `/task/${data.task.id}`)
    props.setCategory("projects")
    const [ commentText, setCommentText ] = useState<string>()
    const [ comments, setComments ] = useState(data.comments)

    const OnCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setCommentText(e.target.value)
    }
    let i = 0 
    
    const addComment = () => {
        let newComment = structuredClone(comments[0])
        newComment.text = commentText
        newComment.id = i + 1 
        setComments([...comments, newComment])
        setCommentText("")
    }

    const changeComment = (id: string) => { 

    }

    const deleteComment = (id: string) => { 
        setComments(comments.filter((value, index) => {
            if (value.id === id) { 
                return false 
            } else { 
                return true 
            }
        }))
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
                    <div className="activity">
                        <div className="comments-container">
                            <div className="create-comment">
                                <img src={user.avatar.fileUrl} alt="" className="comment-profile-image"  height={34} width={34}/>
                                <input type="text" className="create-comment-input" placeholder="Добавить коментарий" value={commentText} onChange={OnCommentInput}/>
                            </div>
                            <div className="apply-comment" onClick={addComment}><p>Опубликовать</p></div>
                            {comments.map((value) => {
                                return ( 
                                    <div className="comment-container">
                                        <img src={value.user.avatar.fileUrl} alt="" className="comment-profile-image" height={34} width={34}/>
                                        <div className="comment-info">
                                            <div className="comment-header">
                                                <p>{value.user.name}</p>
                                                <p>•</p>
                                                <p className="comment-date">{value.createdAt}</p>
                                            </div>
                                            <div className="comment-text">
                                                {value.text}
                                            </div>
                                            <div className="comment-actions">
                                                <div onClick={() => changeComment(value.id)} className="change-comment-action">Изменить</div>
                                                <div>•</div>
                                                <div onClick={() => deleteComment(value.id)} className="delete-comment-action">Удалить</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="task-metainfo">
                    <h3>Сведения</h3>
                    <hr className="metainfo-border"/>
                    <div className="metainfo-data">
                        <div className="metainfo-assiged metainfo-field">
                            <p className="metainfo-header">Исполнитель</p>
                            <div className="maininfo-value">
                            {task.assignedTo !== null ?  
                                <div className="metainfo-account">
                                    <img src={task.assignedTo.avatar.fileUrl} alt="" className="comment-profile-image" width={25} height={25}/>
                                    <div>{task.assignedTo.name}</div>
                                </div>
                            : null }
                            </div>
                        </div>
                        <div className="metainfo-tags metainfo-field">
                            <p className="metainfo-header">Тэги</p>
                            <div className="maininfo-value">
                                {taskTags.map((value) => { 
                                    return (
                                        <div className="metainfo-task-tag">
                                            {value}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="metainfo-author metainfo-field">
                            <p className="metainfo-header">Автор</p>
                            {task.author !== null ?  
                                <div className="metainfo-account">
                                    <img src={task.author.avatar.fileUrl} alt="" className="comment-profile-image" width={25} height={25}/>
                                    <div>{task.author.name}</div>
                                </div>
                            : null }
                        </div>
                        <div className="metainfo-field">
                            <p className="metainfo-header">Создано</p>
                            <div className="maininfo-value">
                                {task.createdAt}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskPage; 
