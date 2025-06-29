import { useState,forwardRef, useImperativeHandle } from 'react';

const NavBar=forwardRef(({onSearch}, ref)=>{
    
    const [search, setSearch] = useState("");

    useImperativeHandle(ref, ()=>({
        search,
        setSearch
    }))

    const handleInputChange = (evt) =>{
        setSearch(evt.target.value);
    }


    const handleInputKeyDown=(evt)=> {
        if(evt.key === "Enter"){
            onSearch(search);
        }
    }

    return(
        <div ref={ref} style={{marginBottom: '12px', width: '100%', display: 'flex'}}>

            <div style={{flex:1, display:'flex'}}>
                <p>eventos</p>
            </div>

            <div style={{flex:1, display:'flex', alignItems: 'center', justifyContent: 'flex-end',}}>
            <input 
                placeholder="Buscar evento" 
                onChange={handleInputChange} 
                onKeyDown={handleInputKeyDown}
                value={search}
             />
            </div>
        </div>
    )
})

NavBar.displayName="NavBar"

export default NavBar;