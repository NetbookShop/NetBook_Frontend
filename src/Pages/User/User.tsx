import { NavProps } from "../../Utils/Types";
import data from "../../TestData/User.json"
import "./User.css"
import organizationIcon from "../../Static/Images/organization-icon.png"
import emailIcon from "../../Static/Images/email-icon.png"
import jobIcon from "../../Static/Images/job-icon.png"

const UserPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")

    return (
        <div className="user-root">
            <div className="user-banner">
                <img src={data.banner.fileUrl} alt="banner" width={"100%"} height={"200px"}/>
            </div>
            <div className="user-container">
                <div className="user-left-navbar-main">
                    <div className="user-avatar">
                        <img src={data.avatar.fileUrl} alt="" className="user-avatar-icon" width={"160px"} height={"160px"}/>
                    </div>
                    <div className="user-left-navbar-info">
                        <h1 className="userpage-username">
                            {data.name}
                        </h1>   
                        <div className="account-control">
                            Управление аккаунтом
                        </div>
                        <div className="account-info-container">
                            <div className="account-main-info">
                                <h3 className="account-info-header">Сведения</h3>
                                <hr className="account-info-line"/>
                                <div className="organization-info account-info-field">
                                    <img src={organizationIcon} alt="org" className="organization-icon"/>
                                    <p>{data.organization}</p>
                                </div>
                                <div className="account-info-job account-info-field">
                                    <img src={jobIcon} alt="org" className="organization-icon"/>
                                    <p>{data.job}</p>
                                </div>
                            </div>
                            <div className="account-contacts">
                                <h3 className="account-info-header">Контакты</h3>
                                <hr className="account-info-line"/>
                                <div className="account-email account-info-field">
                                    <img src={emailIcon} alt="org" className="organization-icon"/>
                                    <p>{data.email}</p>
                                </div>
                            </div>
                            <div className="account-teams">
                                <h3 className="account-info-header">Команды</h3>
                                <hr className="account-info-line"/>
                                {data.teams.map((value) => { 
                                    return ( 
                                        <div className="account-team-container">
                                            <img src={value.logo.fileUrl} alt="" className="account-team-logo" width={30} height={30}/>
                                            <div className="account-team-info">
                                                <p>{value.name}</p>
                                                <p className="account-team-memebers-count">{value.membersCount} Участника</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="account-activity">
                    <div className="account-tasks">
                        <h3 className="account-info-header">Активность на работе</h3>
                        {data.tasks.map((task) => { 
                            return ( 
                                <div className="account-task">
                                    <p className="account-task-name">{task.name}</p>
                                    <div className="account-task-metainfo">
                                        <p className="account-project-name">
                                            {task.projectName}
                                        </p>
                                        <p>•</p>
                                        <p className="account-project-data">
                                            {task.createdAt}
                                        </p>
                                    </div>  
                                </div>
                            )
                        })}
                    </div>

                    <div className="account-attendance">
                        <h3 className="account-info-header">Посещаемость</h3>
                        <div className="attendance-list">
                            {data.workVisits.map((visit) => { 
                                return <div className="account-work-visit">
                                    <p>Посщение работы</p>
                                    <p>{visit.visitedAt}</p>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage; 
