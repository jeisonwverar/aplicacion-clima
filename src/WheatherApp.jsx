import './styles/weatherStyles.css'
import { useState } from 'react'

function App() {
  //busqueda
  const [city, setcity] = useState('')
  //data
  const [dataClimate, setDataClimate] = useState(null)

  const urlBase=`https://api.openweathermap.org/data/2.5/weather`
  const  API_KEY=import.meta.env.VITE_API_WHEATER_KEY;
  const dlKelvin=273.15;
 
  

  const handleChangeCity=(e)=>{
    
    console.log(e.target.value)
    
    
    setcity(e.target.value)
  }

  const fetchClima=async()=>{
    try {
      const response =await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`)
      const data =await response.json()
      setDataClimate(data)
    } catch (error) {
      console.error(error)
    }
  }
 
  const handleSubmit=async(e)=>{
    e.preventDefault();
     if(city.length>0) await fetchClima()

    
  }
   
 console.log(dataClimate)



  return (
    <div className='container' onSubmit={handleSubmit}>
        <h1>Aplicación del Clima</h1>
        <form >
          <input 
          type="text" 
          value={city}
          onChange={handleChangeCity}/>
          <button type="submit">Buscar</button>
        </form>
        {
          dataClimate&& (
            <div>
              <h2>
                {dataClimate.name}
              </h2>
              <p>Temperatura: {parseInt(dataClimate?.main.temp-dlKelvin)} °C </p>
              <p>Condición meteorologica {dataClimate.weather[0].description}</p>
              <img src={`https://openweathermap.org/img/wn/${dataClimate.weather[0].icon}@2x.png`}alt="icon" />
            </div>

          )
        }
    </div>
  )
}

export default App
