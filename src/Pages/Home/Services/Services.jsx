import React, { useEffect, useRef, useState } from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {
    const [services,setServices]=useState([])
    const [asc,setAsc]=useState(true)
    const searchRef=useRef(null);
    const [search,setSearch]= useState("")
    useEffect(()=>{
        fetch(`https://car-doctor-server-tan-nine.vercel.app/services?search=${search}&sort=${asc ? 'asc' : 'des'}`)
        .then(res=>res.json())
        .then(data=>setServices(data))
    },[asc,search])

   // console.log(services)
   console.log(asc)
   const handleSearch=()=>{
     setSearch(searchRef.current.value)
   }
   console.log(search)

    return (
        <div className='mt-4'>
            <div className='text-center'>
                <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
                <h2 className='text-5xl'>Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>
                <div className='flex justify-center mt-10'>
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" ref={searchRef} placeholder="Search…" className="input input-bordered" />
                        <button onClick={handleSearch} className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                    </div>
                </div>
                <button onClick={()=>setAsc(!asc)} className='btn btn-primary mt-10'> {asc?'Low to High':"High to Low"} </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
                {
                    services.map(service=> <ServicesCard
                    key={service._id}
                    service={service}
                    ></ServicesCard> )
                }
            </div>
        </div>
    );
};

export default Services;