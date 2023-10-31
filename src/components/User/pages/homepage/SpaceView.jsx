import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function SpaceView() {
    const [conferenceData, setConferenceData] = useState([])
    const [coWorkData, setCoWorkData] = useState([])
    useEffect(() => {
        const apiUrl = `http://127.0.0.1:8000/space/conference/`;
        axios.get(apiUrl)
        .then((response) =>{
            console.log(response.data.results);
            setConferenceData(response.data.results)
        })


    }, [])

    useEffect(() =>{
        const apiUrl = `http://127.0.0.1:8000/space/cowork/`
        axios.get(apiUrl)
        .then((response)=>{
            console.log(response.data.results)
            setCoWorkData(response.data.results)
        })
    },[])


  return (
    <div>
      
    </div>
  )
}

export default SpaceView
