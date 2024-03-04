import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import { NavProps } from "../../Utils/Types";
import "./Task.css"
import data from "../../TestData/Task.json"
import { useState } from "react";
import addIcon from "../../Static/Images/add-icon.png"
import Modal from "../../Modals/Base/Base";
import AssignTask from "../../Modals/Task/AssignTask";

const exampleComment = { 
    "id": "1234", 
    "text": "ok", 
    "createdAt": "4 минуты назад",
    "user": { 
        "id": "1234", 
        "name": "olola", 
        "avatar": { 
            "fileId": "3132131", 
            "fileUrl": "/static/dsdadasdasdasdasdas-31321", 
            "mimeType": "image", 
            "fileName": "313dasdadas", 
            "fileSize": 31321312
        }
    }
}

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
    const [ currentCommentID, setCurrentCommentID] = useState<string>()
    const [ currentCommentText, setCurrentCommentText] = useState('')
    const [ isOpenAssignUser, setIsOpenAssignUser ] = useState(false)

    const OnCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setCommentText(e.target.value)
    }

    const addComment = () => {
        let newComment: any
        newComment = structuredClone(exampleComment)

        newComment.text = commentText  
        newComment.id = crypto.randomUUID() 
        console.log(newComment.id)
        setComments([...comments, newComment])
        setCommentText("")
    }

    const changeComment = (id: string) => { 
        setCurrentCommentID(id)
        comments.map((value) => { 
            setCurrentCommentText(value.text)
        })
    }

    const submitChange = (id: string) => { 
        comments.map((value, index) => { 
            if (value.id === id && currentCommentText !== undefined) { 
                comments[index].text = currentCommentText
            }
        })
        setCurrentCommentID(undefined)
        setCurrentCommentText('')
    }

    const deleteComment = (id: string) => { 
        setComments(comments.filter((value, index) => {
            console.log(id, value.id)
            if (value.id === id) { 
                return false 
            } else { 
                return true 
            }
        }))
    }

    return ( 
        <div className="task-root">
            <Modal isOpen={isOpenAssignUser} onClose={() => setIsOpenAssignUser(true)}> 
                <AssignTask setIsOpenModal={setIsOpenAssignUser}/>
            </Modal>
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
                                                {currentCommentID !== value.id ?  
                                                    <div>
                                                        {value.text}
                                                    </div> : 
                                                    <input
                                                        type="text" 
                                                        className="change-comment-input" 
                                                        placeholder="Изменить коментарий" 
                                                        value={currentCommentText} 
                                                        onChange={(e) => setCurrentCommentText(e.target.value)}
                                                    />
                                                } 
                                            </div>
                                            <div className="comment-actions">
                                                { currentCommentID !== value.id ? 
                                                    <div className="comment-actions">
                                                        <div onClick={() => changeComment(value.id)} className="change-comment-action">Изменить</div>
                                                        <div>•</div>
                                                        <div onClick={() => deleteComment(value.id)} className="delete-comment-action">Удалить</div>
                                                    </div>
                                                : <div>
                                                    <div onClick={() => submitChange(value.id)} className="apply-comment-change">Подвердить</div>
                                                </div> } 
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
                            {task.assignedTo.id  !== null ?  
                                <div className="metainfo-account">
                                    <img src={task.assignedTo.avatar.fileUrl} alt="" className="comment-profile-image" width={25} height={25}/>
                                    <div>{task.assignedTo.name}</div>
                                </div>
                            : <div className="metainfo-add-user" onClick={() => setIsOpenAssignUser(true)}>
                                <img src={addIcon} alt="" className="metainfo-add-user-image" width={25} height={25}/>
                                <div>Добавить пользвателя</div>
                            </div> }
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
