import React, { useState } from 'react'

const Test = () => {

  

    const patientsData = [
        'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
        'eighteen', 'nineteen', 'twenty', 'twenty one', 'twenty two', 'twenty three', 'twenty four',
        'twenty five', 'twenty six', 'twenty seven', 'twenty eight', 'twenty nine', 'thirty',
        'thirty one', 'thirty two', 'thirty three', 'thirty four', 'thirty five', 'thirty six',
        'thirty seven', 'thirty eight', 'thirty nine', 'forty', 'forty one', 'forty two', 'forty three',
        'forty four', 'forty five', 'forty six', 'forty seven', 'forty eight', 'forty nine', 'fifty',
        'fifty one'
      ]

      const [startingIndex,setStartingIndex]=useState(0)
      const [endingIndex,setEndingIndex]=useState(10)
      const [itemlist,setItemlist]=useState(patientsData.slice(startingIndex,endingIndex))

      console.log("listitem",startingIndex)

    // const listItem = patientsData && patientsData.length > 0 && patientsData.filter((item,index)=>{
    // console.log("itemlist",item,index)
    // .slice(10)
    

    // if(index === 9){
    //     return item
    // }
    // })

  
   

    const handleMove = (move) => {
        if(move === 'pre'){
           
            const nextStartingIndex = startingIndex-10
            const nextEndingIndex = endingIndex-10
            setItemlist(patientsData.slice(nextStartingIndex, nextEndingIndex))
           setStartingIndex(nextStartingIndex)
           setEndingIndex(nextEndingIndex)
          
        }
        else if(move === 'next'){
            const nextStartingIndex = startingIndex+10
            const nextEndingIndex = endingIndex+10
            setItemlist(patientsData.slice(nextStartingIndex, nextEndingIndex))
           setStartingIndex(nextStartingIndex)
           setEndingIndex(nextEndingIndex)
        }
    }







  return (
    <div>
        <ul>
            {
                itemlist.map((item,index)=>(
                    <li>{item}</li>
                ))
            }
        </ul>

        <button onClick={()=>handleMove('pre')} disabled={startingIndex === 0}>prev</button>
        <button onClick={()=>handleMove('next')}>next</button>
    </div>
  )
}

export default Test
