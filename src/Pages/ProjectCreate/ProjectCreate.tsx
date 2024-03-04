import { NavProps } from "../../Utils/Types";
import bannerForPlacement from "../../Static/Images/banner-for-place.svg"
import ActionsButtonsComponent from "../../Components/Actions/Actions";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../../Static/Images/arrow-icon-long.png"
import "./ProjectCreate.css"

const ProjectCreatePage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("none")

    const saveProject = () => { 

    }

    const navigate = useNavigate()

    return (
        <div className="projectcreate-root">
            <div className="project-create-nav" onClick={() => navigate("/teams")}>
                <img src={arrowIcon} alt="" className="back-arrow"/>
                <p>Вернутся к вашим проектам</p>
            </div>
            <div className="create-project-cotainer">
                <img src={bannerForPlacement} alt="" className="create-team-banner"/>
                <div className="create-team-form">
                    <h2>Создайте проект</h2>
                    <p>Узнайте, чего можно достичь при совместной работе с командой. Сведения о проекте можно изменить в любое время в настройках проекта.</p>
                    <div className="create-team-field">
                        <label htmlFor="name">Название <span className="required-field">*</span></label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Название проекта" 
                            className="create-team-field-input"
                        />
                    </div>
                    <div className="create-team-field">
                        <label htmlFor="name">Описание <span className="required-field">*</span></label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Описание проекта." 
                            className="create-team-field-input"
                        />
                    </div>
                    <div className="create-team-actions">
                        <ActionsButtonsComponent submitAction={() => saveProject()} cancelAction={() => navigate('/teams')}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCreatePage; 
