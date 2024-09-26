"use client"
import React, { useEffect, useState } from 'react'
import { RiHeartFill } from "@remixicon/react";

const Styling = () => {
  
  const [city, setcity] = useState("")
  const [search, setsearch] = useState("Nagpur")
  useEffect(() => {
    const callApi = async () =>{
      try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=1fe03e4d75b25077e07b4025ce422fbe`)
    let resjson = await response.json();
    console.log(resjson);
    setcity(resjson.main);

      } catch {
        console.log("No city found")
      }
        
    }

    callApi();  
  
  },[search])
  
  return (
    <>
    <div className='flex items-center justify-center h-screen'>
    <div className="bg-[url('https://media.istockphoto.com/id/1203668665/photo/overlooking-the-valley.jpg?s=2048x2048&w=is&k=20&c=6KQHlkAiassRHG8_TihpK2_QdsIlFfA279xyVc9STZg=')] bg-cover bg-center h-4/5 w-2/3 text-white p-6 rounded-lg shadow-lg text-center transition-transform transform hover:-translate-y-1 hover:shadow-xl">
        <input
        className=' m-10 h-12 w-2/3 bg-white text-black rounded '
        type="search"
        value={search}
        placeholder='Search...'
        onChange={(e)=>{
          
          setsearch(e.target.value)
        }}
        />
        {!city ?(
          <p>No Data Found</p>
        ):(
          <div>
        <h1 className='mt-10 text-black text-8xl'>{search}</h1>
        
        <h5 className='pt-4 text-4xl'>{city.temp}°C</h5>
        <h2 className='pt-4'>Max : {city.temp_max}°C || Min {city.temp_min}°C </h2>
        <h5 className='text-2xl pt-10 mr-96'>Humidity : {city.humidity}</h5>
        </div>
      )}
    </div>
   
    </div>
   
    </>
  )
}

export default Styling

