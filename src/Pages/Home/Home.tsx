import Data from "../../TestData/Home.json"  

const HomePage: React.FC = () => { 
    const tasks = Data.tasks; 
    const projects = Data.projects; 
    
    return (
        <div className="home-root">
            <h1 className="your-work">Ваша работа</h1>
            <h4 className="recent-projects">Недавние проекты</h4>
            <div>
                {projects.map((value, index) => { 
                    return (
                        <div className="project-show">
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HomePage; 