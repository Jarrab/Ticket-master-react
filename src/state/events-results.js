import { create } from "zustand";

//Store para guardar valores de manera global 
const useEventsResults = create((set)=>({
  data: [],
  error:null,
  isLoading: true,

  FecthEvents:  async (param) => {
  try {
    await set(()=>({isLoading: true}))

    const response = await fetch (
    `/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTE_API_KEY}&countryCode=MX${param?.length ? param : ''}`
    );
    const data = await response.json();

    await set(()=>({data, isLoading:false}))
  } catch (error) {
    await set(()=>({error}))
    }}

}));

export default useEventsResults


