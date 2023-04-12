import React from 'react'
import { useState } from 'react'
import Location from '../components/Location'
import Middlebar from '../components/Middlebar'
import Temperature from '../components/Temperature'
import './weatherapp.css'
import axios from 'axios';
import Loader from '../components/Loader'




export default function Weatherapp() {
  const [search, setSearch] = useState({})

  const [state, setState] = useState({
    value: "",
    current: {},
    weekinfo: [],
    loading: false,
    error: false

  })
  const changeInput = (event) => {
    setState({
      ...state,
      value: event.target.value

    })
  }

  const changeClick = (e) => {
    e.preventDefault()
    setSearch({ ...search, state })
    console.log(search)

    setState({
      ...state,
      loading: true,
    })




    axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${state.value}&units=metric&cnt=7&appid=d94bcd435b62a031771c35633f9f310a`).then(data => {
      console.log(data)


      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const dates = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

      const currentdate = new Date()
      console.log(currentdate)
      console.log("day==>", currentdate.getDay())
      console.log("month==>", currentdate.getMonth())
      const date = `${dates[currentdate.getDay()]} ${currentdate.getDate()} ${months[currentdate.getMonth()]}`
      console.log("date==", date)

      const sunset = new Date(data.data.list[0].sunset * 1000).toLocaleTimeString().slice(0, 4)
      const sunrise = new Date(data.data.list[0].sunrise * 1000).toLocaleTimeString().slice(0, 4)




      const current = {
        city: data.data.city.name,
        country: data.data.city.country,
        population: data.data.city.population,
        date,
        sunrise,
        sunset,
        Temp: data.data.list[0].temp,
        pressure: data.data.list[0].pressure,
        speed: data.data.list[0].speed,
        humidity: data.data.list[0].humidity,
        // main:data.data.weather[0].main,
      }
      console.log("current data==>", current)


      const dats = `${currentdate.getDate()}`
      const Weekdata = data.data.list
      console.log(Weekdata);
      const weekinfo = Weekdata.map((Weekdetails) => {
        return {
          dats,
          // date,
          day:new Date(Weekdetails.dt*1000).toLocaleString('en-us',{weekday:'long',year:'numeric',month:'long',day:'numeric'}).slice(0,3),
          main: Weekdetails.weather[0].main,
          icon: Weekdetails.weather[0].icon,
          discription: Weekdetails.weather[0].description,
          max: Weekdetails.temp.max,
          min: Weekdetails.temp.min,


        }
       


      })
      console.log(weekinfo)

      setState({
        ...state,
        current,
        weekinfo,
        loading: false,
        error: false,
      })

      console.log("weathrdata==>", weekinfo);



    }).catch((err) => {
      setState({
        ...state,
        current: {},
        weekinfo: [],
        loading: false,
        error: true,
      })
    })





  }






  return (
    <>


      <div class="container-fluid" id="imggg" >
        <div class="row" >
          <div class="row" style={{ height: "4rem" }}></div>
          <div class="nav">

            <form class="d-flex" role="search">
              <input class="form-control me-2" id='navbar' name='name' onChange={changeInput} type="search" placeholder="Search" aria-label="Search" style={{ width: "40rem" }} />
              {/* <button type='submit'>Search</button> */}
              <button class="btn btn-outline-success" onClick={changeClick} type="submit">Search</button>
            </form><br />
          </div><br />

        </div><br />

        {state.loading === true ? <Loader /> :
          <div>
            {state.current.city !== undefined ?
              <>
                <div class="row" style={{ display: "flex" }}>
                  <div class="col-sm-6" ><Location details={state.current} /></div>
                  <div class="col-sm-6" ><Temperature detail={state.current} /></div>
                </div>
                <div class="row" style={{ height: "3rem" }}></div>
                <div class="col-sm-12"><Middlebar state={state.weekinfo}/></div>
              </>
              :

              state.error === true ?

                <p style={{ color: "white" }}> error</p> 

                :

                <div>

                </div>
            }





          </div>



        }



      </div>


    </>
  )
}
