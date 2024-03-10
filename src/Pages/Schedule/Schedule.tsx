import { useParams } from "react-router-dom";
import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import { NavProps } from "../../Utils/Types";
import { useEffect, useState } from "react";
import { Team, TeamControllersApi } from "task-manager";
import { ApiConfig } from "../../Gateway/Config";
import "./Schedule.css"
import arrowIcon from "../../Static/Images/arrow-icon-long.png"

const SchedulePage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")
    const { id } = useParams()
    const [team, setTeam] = useState<Team>()

    let elements = new Map<string, string>()
    elements.set("Команды", "/projects")
    elements.set(team?.name || "", `/team/${team?.id || ""}`)
    elements.set("График", `/team/${team?.id || ""}/schedule`)

    const days: Array<string> = [] 
    team?.dayTimetables?.map((value) => { 
        days.push(value.name)
    })

    useEffect(() => { 
        (async () => { 
            try { 
                let teamApi = new TeamControllersApi(ApiConfig)
                let response = await teamApi.getTeam(id || "")
                setTeam(response.data)
            } catch (e) { 
                console.error(e)
            }
        })()
    }, [])

    return ( 
        <div className="schedule-root">
            <NavigationMapComponent elements={elements}/> 
            <h1 className="schedule-header">График работы</h1>
            <div className="schdule-navbar">
                <div className="schedule-navbar-name">День</div>
                <div className="schedule-navbar-name">Работа</div>
                <div className="schedule-navbar-name">Перерыв</div>
            </div>
            <div className="schedule-days-container">
                <div className="schedule-days">
                    {team?.dayTimetables?.map((value) => { 
                        return ( 
                            <div className="schedule-day-one">
                                {value.name}
                                <hr />
                            </div>
                        )
                    })}
                </div>
                <div className="schedule-days-work">
                    {team?.dayTimetables?.map((value) => {
                        if (value.type === "weekend") { 
                            return (
                                <div>
                                    <div className="schedule-day-info">
                                        <div>Выходной</div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        } 
                        return ( 
                            <div>
                                <div className="schedule-day-info">
                                    <div>{value.startsAt.toString().slice(0, 10)}</div>
                                    <img src={arrowIcon} alt="стрелка" className="schedule-day-arrow" width={25} height={20}/>
                                    <div>{value.endsAt.toString().slice(0, 10)}</div>
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                </div>
                <div className="schedule-days-break">
                    {team?.dayTimetables?.map((value) => { 
                        if (value.subType !== "break") { 
                            return (<div><div className="schedule-day-info">Не назначено</div><hr/></div>)
                        }
                        return (
                            <div>
                                <div className="schedule-day-info">
                                    <div>{value.startsAt.toString().slice(0, 10)}</div>
                                    <img src={arrowIcon} alt="стрелка" className="schedule-day-arrow" width={25} height={20}/>
                                    <div>{value.endsAt.toString().slice(0, 10)}</div>
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SchedulePage; 
