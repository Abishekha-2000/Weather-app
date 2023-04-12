import React from 'react'
import "./Location.css"

export default function Location({details}) {
  return (
  <>
   <div class="container border" id="head">
    <div class="row">
        <div class="row" style={{height:"3vw"}}></div>
        <div class="col" id="forheight">
            <h1>{details.city},{details.country}</h1>
            <h5>{details.date}</h5>
            <h5>Population:{details.population}</h5>
        </div>
    </div>
   </div>
  
  
  
  </>
  )
}
