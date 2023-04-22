import axios from 'axios'
import { useState, useEffect } from 'react'
import "./style.css";


const Main = () => {
  const baseUrl = '/api/db'
  const [ data, setData ] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(response =>
      setData(response.data)
    )
  }, [])  

  const totalByMonths = []
  for (let i = 0; i < 12; i++) {
    totalByMonths[i] = data.reduce((accumulator, current) => {
      return accumulator + +current.months[i].value
    }, 0)  
  }

  const totalOfTotals = totalByMonths.reduce((accumulator, current) => {
    return accumulator + current
  }, 0)

  const handleInput = async (event, entryIndex, monthIndex) => {
  let entryToBeChanged = data[entryIndex]
  entryToBeChanged.months[monthIndex].value = +event.target.value
  
  const response = await axios.put(`${baseUrl}/${entryIndex}`, entryToBeChanged)
  setData(response.data) 
  }


  return (
    <>
      <table>
        <thead>
          <tr>
            <th className='firstColumn'>Store</th>
            <th>Jan</th>
            <th>Feb</th>
            <th>Mar</th>
            <th>Apr</th>
            <th>May</th>
            <th>Jun</th>
            <th>Jul</th>
            <th>Aug</th>
            <th>Sep</th>
            <th>Oct</th>
            <th>Nov</th>
            <th>Dec</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, entryIndex) => (
            <tr key={entry.store.id}>
              <td>
                {entry.store.name}                
              </td>
              {entry.months.map((month, monthIndex) => (
                <td>
                  <input
                    key={month.id}
                    name="name"
                    value={month.value}
                    type="text"
                    onChange={(event) => handleInput(event, entryIndex, monthIndex)}
                  />
                </td>
              ))}
              <td>
                {entry.months.reduce((accumulator, current) => { return accumulator + current.value }, 0)}
              </td>
            </tr>
          ))}
          <tr>
              <td></td>
              {totalByMonths.map((month) => (
                <td>{month}</td>
              ))}
              <td>{totalOfTotals}</td>
          </tr>
        </tbody>
      </table>

    </>
  )
}

export default Main