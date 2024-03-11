import { useEffect, useState } from "react"
import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import { NavProps } from "../../Utils/Types";
import "./TeamList.css"
import properties from "../../Static/Images/propertiesIcon.svg"
import { NavLink } from "react-router-dom";
import Modal from "../../Modals/Base/Base";
import CreateTeamModal from "../../Modals/Team/CreateTeam";
import { Team, TeamControllersApi } from "task-manager";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";

const TeamsListPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")
    let elements = new Map<string, string>()
    elements.set("Команды", "/teams")
    const [isTeamCreateModal, setTeamCreateModal] = useState(false)
    const [teams, setTeams] = useState<Array<Team>>([])

    useEffect(() => { 
        let teamApi = new TeamControllersApi(ApiConfig)

        const getData = async () => { 
            try { 
                let response = await teamApi.getTeamsAll() 
                setTeams(response.data)
            } catch (e) { 
                console.error(e)
            }
        }

        getData() 
    }, [props.user])

    return (
        <div className="teamslist-root">
            <Modal isOpen={isTeamCreateModal} onClose={() => setTeamCreateModal(false)}>
                <CreateTeamModal setIsOpenModal={setTeamCreateModal}/>
            </Modal>
            <NavigationMapComponent elements={elements}/>
            <h1>Команды</h1>
            <div className="teams-container">
                <div className="teams-fields">
                    <div className="teams-field-name">Имя</div>
                    <div className="teams-field-owner">Руководитель</div>
                </div>
                <div className="team-create-button general-button" onClick={() => setTeamCreateModal(true)}>
                    Создать команду
                </div>
            </div>
            <div className="teams-list">
                {teams.map((value) => { 
                    return (
                        <NavLink to={`/team/${value.id}`} className="team-list-container">
                            <div className="team-container-left-content">
                                <div className="team-container-name">
                                    <img src={asFileUrl(value.avatar?.id)} alt="" width={24} height={24} className="avatar-icon"/>
                                    <p className="team-name">{value.name}</p>
                                </div>
                                <div className="team-container-owner">
                                    <img src={asFileUrl(value.createdBy?.avatar?.id)} alt="" className="avatar-icon"/>
                                    <p className="owner-name">{value.createdBy?.fullName}</p>
                                </div>
                            </div>
                            <div className="team-container-properties">
                                <img src={properties} alt="" width={24} height={24}/>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default TeamsListPage; 
