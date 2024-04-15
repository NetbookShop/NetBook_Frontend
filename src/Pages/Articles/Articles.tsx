import { NavProps } from "../../Utils/Types";
import "./Articles.css"
import { Link } from "react-router-dom";

const ArticlesPage: React.FC<NavProps> = (props: NavProps) => { 
    return (
    <div className="articles">
        <div className="container">
            <h1>Статьи</h1>
        </div>
    </div>
    )
}

export default ArticlesPage; 