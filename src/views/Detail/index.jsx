import { useParams } from "react-router"
import { useEffect, useState } from "react"
import styles from "./Detail.module.css"
import {format} from "date-fns"

const Detail = () => {
    const { eventId }=useParams()
    const [dataEvent, setDataEvent] = useState({})
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchEventData = async () =>{
            try {
                const response = await fetch(`/discovery/v2/events/${eventId}?apikey=${import.meta.env.VITE_TICKETMASTE_API_KEY}`)
                const data = await response.json()

                setDataEvent(data)
                setIsLoading(false)
            } catch (error) {
                setDataEvent({})
                setError(error)
                setIsLoading(false)
            }
        }
        fetchEventData()
    },[])


    if (isLoading && Object.keys(dataEvent)=== 0){
        return <div>Cargando evento...</div>
    }

    if(Object.keys(error) > 0){
        return <div>Ha ocurrido un error </div>
    }

    console.log(dataEvent)

const getFormattedDate = (dateObject) => {
    if (dateObject?.start?.dateTime) { // Verifica si dates, start y dateTime existen
        try {
            return format(new Date(dateObject.start.dateTime), 'MM/dd/yyyy');
        } catch (e) {
            console.error("Error al formatear la fecha:", e);
            return "Fecha inválida";
        }
    }
    return "Fecha no disponible";
};

//como era antes {dataEvent?.dates?.start?.dateTime ?  <p>{format(new Date(dataEvent.dates.start.dateTime), 'd LLL yyyy H:mm')}</p> : null}
    return (
        <div className={styles.container}>
            <div className={styles.mainInfoContainer}>
                <img className={styles.eventImage} src={dataEvent.images?.[0].url} alt="" />
                <h4 className={styles.eventName}>{dataEvent.name}</h4>
                <p className={styles.infoParagraph}>{dataEvent.info}</p>
                <p className={styles.dateParagraph}>{getFormattedDate(dataEvent.dates)}</p>
            </div>

            <div className={styles.seatInfoContainer}>
                <h6 className={styles.seatMapTittle} >mapa del evento</h6>
                <img src={dataEvent?.seatmap?.staticUrl} alt="una imagen de asientos :v" />
                <p className={styles.pleaseNote}>{dataEvent?.pleaseNote}</p>
                <p className={styles.priceRange} >{dataEvent?.priceRanges?.[0].min}-{dataEvent.priceRanges?.[0].max}</p>
            </div>

            <a href={dataEvent?.url}>
                Compra tu boletos
            </a>

        </div>
    )
}

export default Detail