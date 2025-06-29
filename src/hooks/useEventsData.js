import { useState } from "react";
//import data from "../data/events.json"

//este funcion hook existe solo porque un componente lo va a usar
//hook para hacer una llamada a la api y guardarlo en tu estado local 
const useEventsData =  () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  const FecthEvents = async (params)=>{
try {
  const response = await fetch(`/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTE_API_KEY}&countryCode=MX${param?.length ? param : ''}`)
  const data = response.json()

  setData(data)
  setIsLoading(false)
  
} catch (error) {
  
}
  }


  /* setTimeout(()=>{
            try {
                setEvents(data)
                setIsLoading(false)
            } catch (error) {
                setError(error)
            }
        },4000)*/

  return {
    event: events?._embedded?.events || [],
    isLoading,
    page: data?.page || {},
    error,
    FecthEvents,
  };
}

export default useEventsData;
