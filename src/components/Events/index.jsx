import EventItems from "./components/EventItems";
import { useNavigate } from "react-router";

const Events = ({searchTerm, event}) => {
    const navigate = useNavigate()
    
    const handleEventItemClick = (id) => {
        navigate(`/detail/${id}`)
    }

    const renderComponent = () => {
        let eventsFiltered = event;

        if(searchTerm.length > 0){
            eventsFiltered=eventsFiltered.filter((item)=>item.name.toLowerCase().includes(searchTerm))
        }

        return eventsFiltered.map((eventItem) => (
            <EventItems
                key={`event-item-${eventItem.id}`}
                name={eventItem.name}
                info={eventItem.info}
                image={eventItem?.images[0]?.url}
                id={eventItem.id}
                onEventClick={handleEventItemClick}
            />
        ))
    }

    return (
        <div onClick={() => console.log("Padre clickeado")  }>
            Events
            {renderComponent()}
        </div>
    )
}

export default Events;