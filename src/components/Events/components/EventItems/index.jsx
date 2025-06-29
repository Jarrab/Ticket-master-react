import { Link } from "react-router";
import "./style.css";
//import styles from "./Eventitem.module.css"
const EventItems = ({ id, info, name, image, onEventClick }) => {

  const handleSeeMoreClick = (evt) => {
    evt.stopPropagation(); // Prevent the click from bubbling up to the parent
    onEventClick(id);
  };
  
  return (
    <div className="event-item-container">
      <img src={image} alt={name} width={200} height={100} />
      <div className="event-info-container">
        <h4 className="event-name">{name}</h4>
        <p className="event-info">{info}</p>
      </div>
      <button onClick={handleSeeMoreClick} className="see-more-btn"> ver mas... </button> 
    </div>
  );
  //<Link to={`/detail/${id}`} >Ver mas...</Link> podemos tambien usar link para redirigirnos a otra pagina
};
export default EventItems;
