import { useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import { format } from "date-fns"; // Asegúrate de tener date-fns instalado: npm install date-fns
import { es } from "date-fns/locale";

const Detail = () => {
    const { eventId } = useParams();
    const [dataEvent, setDataEvent] = useState(null); // Inicializa a null para distinguir entre "no cargado" y "objeto vacío"
    const [error, setError] = useState(null); // Inicializa a null
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                // Realiza la petición a la API de Ticketmaster para un evento específico por su ID
                const response = await fetch(`/discovery/v2/events/${eventId}?apikey=BTnr9k7yLKID66Sf7ABXwquwmcE02GxX`);
                
                // Si la respuesta no es OK (ej. 404 Not Found), lanza un error
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                // Si la data está vacía o no tiene el formato esperado, puedes manejarlo aquí
                if (!data || Object.keys(data).length === 0) {
                    throw new Error("No se encontraron datos para este evento.");
                }

                setDataEvent(data); // Establece los datos del evento
                setIsLoading(false); // Finaliza el estado de carga

            } catch (err) {
                console.error("Error al obtener los datos del evento:", err);
                setError(err); // Establece el error
                setIsLoading(false); // Finaliza el estado de carga
                setDataEvent(null); // Asegura que dataEvent esté nulo en caso de error
            }
        };

        fetchEventData(); // Llama a la función de carga de datos cuando el componente se monta
    }, [eventId]); // Agrega eventId como dependencia para volver a cargar si cambia el ID del evento

    // 1. Manejo del estado de carga
    if (isLoading) {
        return <div className={styles.loading}>Cargando evento...</div>;
    }

    // 2. Manejo del estado de error
    if (error) {
        return <div className={styles.error}>Ha ocurrido un error: {error.message || "Error desconocido"}</div>;
    }

    // 3. Manejo del caso donde no se encuentran datos después de la carga (y sin error explícito)
    if (!dataEvent) {
        return <div className={styles.noData}>El evento no fue encontrado o no hay datos disponibles.</div>;
    }

    // Una vez que isLoading es false, no hay error y dataEvent tiene datos, podemos renderizar
    console.log("Datos del evento cargados:", dataEvent);
    console.log("Fecha de inicio:", dataEvent?.dates?.start?.dateTime); // Uso correcto del encadenamiento opcional

    // Helper para obtener la fecha formateada de forma segura
    const getFormattedDate = (dateObject) => {
        if (dateObject?.start?.dateTime) {
            try {
                return format(new Date(dateObject.start.dateTime), 'MM/dd/yyyy H:mm', {locale: es});
            } catch (e) {
                console.error("Error al formatear la fecha:", e);
                return "Fecha inválida";
            }
        }
        return "Fecha no disponible";
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainInfoContainer}>
                {/* Verifica si hay imágenes antes de intentar acceder a la URL */}
                {dataEvent.images && dataEvent.images.length > 0 && (
                    <img src={dataEvent.images[0].url} alt={dataEvent.name || "Imagen del evento"} className={styles.eventImage} />
                )}
                <h4 className={styles.eventName}>{dataEvent.name || "Nombre no disponible"}</h4>
                <p className={styles.eventInfo}>{dataEvent.info || "Información no disponible"}</p>
                
                {/* Usa el helper para mostrar la fecha de forma segura */}
                <p className={styles.eventDate}>Fecha: {getFormattedDate(dataEvent.dates)} hrs</p>

                {/* Puedes añadir más detalles aquí, como la ubicación, el género, etc. */}
                {dataEvent.venues && dataEvent.venues.length > 0 && (
                    <p className={styles.eventVenue}>Lugar: {dataEvent.venues[0].name || "Lugar no disponible"}</p>
                )}
                {dataEvent.classifications && dataEvent.classifications.length > 0 && (
                    <p className={styles.eventGenre}>Género: {dataEvent.classifications[0].genre?.name || "Género no disponible"}</p>
                )}

                {dataEvent.url && (
                    <a 
                        href={dataEvent.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.buyTicketsButton}
                    >
                        Comprar Boletos
                    </a>
                )}
            </div>
        </div>
    );
};

export default Detail;
