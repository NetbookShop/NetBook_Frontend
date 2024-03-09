import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import { NavProps } from "../../Utils/Types";
import "./Task.css"
import data from "../../TestData/Task.json"
import { useEffect, useState } from "react";
import addIcon from "../../Static/Images/add-icon.png"
import Modal from "../../Modals/Base/Base";
import AssignTask from "../../Modals/Task/AssignTask";
import { Comment as CommentModel, CommentApi, TaskControllersApi, TaskModel } from "task-manager";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";
import { useParams } from "react-router-dom";

const TaskPage: React.FC<NavProps> = (props: NavProps) => { 
    let elements = new Map<string, string>()
    const [task, setTask] = useState<TaskModel>()
    const { id } = useParams()
    const taskId = id 
    const taskTags = data.task.tags 
    elements.set("Проекты", "/projects")
    elements.set(data.project.name, `/project/${data.project.id}`)
    elements.set(data.task.name, `/task/${data.task.id}`)
    props.setCategory("projects")
    const [ commentText, setCommentText ] = useState<string>()
    const [ comments, setComments ] = useState<Array<CommentModel>>([])
    const [ currentCommentID, setCurrentCommentID] = useState<string>()
    const [ currentCommentText, setCurrentCommentText] = useState('')
    const [ isOpenAssignUser, setIsOpenAssignUser ] = useState(false)
    let commentApi = new CommentApi(ApiConfig)

    const OnCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setCommentText(e.target.value)

        return 
    }

    const addComment = async () => {
        let commentResponse = await commentApi.createComment({ 
            text: commentText, 
            taskId: taskId, 
        })
        let newComment = commentResponse.data 
        console.log(newComment.id)
        setComments([...comments, newComment])
        setCommentText("")

        return 
    }

    const changeComment = (id: string) => { 
        setCurrentCommentID(id)
        comments.map((value) => { 
            setCurrentCommentText(value.text)
        })
    }

    const submitChange = async (id: string) => { 
        comments.map(async (value, index) => { 
            if (value.id === id && currentCommentText !== undefined) { 
                try { 
                    await commentApi.updateComment(value.id, { 
                        text: currentCommentText, 
                    })
                    comments[index].text = currentCommentText
                } catch (e) { 
                    console.error(e)
                } 
                return 
            }
        })
        setCurrentCommentID(undefined)
        setCurrentCommentText('')
    }

    const deleteComment = async (id: string) => {
        try {  
            await commentApi.deleteComment(id)
        } catch (e) { 
            console.error(e)
        }
        setComments(comments.filter((value, index) => {
            console.log(id, value.id)
            if (value.id === id) { 
                return false 
            } else { 
                return true 
            }
        }))
    }

    useEffect(() => {
        let taskApi = new TaskControllersApi(ApiConfig)
        
        const getData = async () => { 
            try { 
                let taskResponse = await taskApi.getTask(taskId || "")
                setTask(taskResponse.data)

            } catch (e) { 
                console.error(e)
            }
        }
        getData()
    }, [])
    useEffect(() => { 
        (async () => { 
            try { 
                let commentsResponse = await commentApi.getComments(taskId)
                setComments(commentsResponse.data)
            } catch (e) { 
                console.error(e)
            }
        })() 
    }, [comments])

    return ( 
        <div className="task-root">
            <Modal isOpen={isOpenAssignUser} onClose={() => setIsOpenAssignUser(true)}> 
                <AssignTask setIsOpenModal={setIsOpenAssignUser}/>
            </Modal>
            <NavigationMapComponent elements={elements}/>
            <div className="task-container">
                <div className="task-main-info">
                    <div className="task-header">
                        <h1>{task?.title}</h1>
                    </div>
                    <h4>Описание</h4>
                    <div className="description-container">
                        {task?.description }
                    </div>
                    <div className="activity">
                        <div className="comments-container">
                            <div className="create-comment">
                                <img src={asFileUrl(props.user?.avatar?.filePath)} alt="" className="comment-profile-image"  height={34} width={34}/>
                                <input type="text" className="create-comment-input" placeholder="Добавить коментарий" value={commentText} onChange={OnCommentInput}/>
                            </div>
                            <div className="apply-comment" onClick={addComment}><p>Опубликовать</p></div>
                            {comments.map((value) => {
                                return ( 
                                    <div className="comment-container">
                                        <img src={asFileUrl(value.createdBy.avatar?.filePath)} alt="" className="comment-profile-image" height={34} width={34}/>
                                        <div className="comment-info">
                                            <div className="comment-header">
                                                <p>{value.createdBy.fullName}</p>
                                                <p>•</p>
                                                <p className="comment-date">{value.createdAt.toString()}</p>
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
                                                        <div onClick={() => changeComment(value.id || "")} className="change-comment-action">Изменить</div>
                                                        <div>•</div>
                                                        <div onClick={() => deleteComment(value.id || "")} className="delete-comment-action">Удалить</div>
                                                    </div>
                                                : <div>
                                                    <div onClick={() => submitChange(value.id || "")} className="apply-comment-change">Подвердить</div>
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
                            {task?.assignedUser  !== null && task?.assignedUser !== undefined ?  
                                <div className="metainfo-account">
                                    <img src={asFileUrl(task.assignedUser.avatar?.filePath)} alt="" className="comment-profile-image" width={25} height={25}/>
                                    <div>{task.assignedUser.fullName}</div>
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
                            {task?.createdBy !== null ?  
                                <div className="metainfo-account">
                                    <img src={asFileUrl(task?.createdBy.avatar?.filePath)} alt="" className="comment-profile-image" width={25} height={25}/>
                                    <div>{task?.createdBy.fullName}</div>
                                </div>
                            : null }
                        </div>
                        <div className="metainfo-field">
                            <p className="metainfo-header">Создано</p>
                            <div className="maininfo-value">
                                {task?.startedAt.toString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskPage; 
