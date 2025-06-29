import { useRouteError } from "react-router"
import style from "./Error404.module.css"

const Error404  = ()=>{
    const error = useRouteError();

    return (
        <div className={style.container}>
            <h3 className={style.tittle}>{error.status} Ops!</h3>
            <p className={style.description}>{error.data}</p>
        </div>
    )
}
 
export default Error404