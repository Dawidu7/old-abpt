import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { saveAs } from 'file-saver'
import Row from './components/Row'

export default function Planner() {
  useEffect(() => {document.title = 'Planner'})

  const [dropdownItems, setDropdownItems] = useState({catalogs: null, constellations: null, telescopes: null, cameras: null, filters: null, angles: null})
  const [rows, setRows] = useState([])

  console.log(rows)

  useEffect(() => {
    Object.keys(dropdownItems).forEach(type => {
      fetch(`${process.env.REACT_APP_API}/planner/get-${type}`)
      .then(response => response.json())
      .then(data => {let copyDropdownItems = dropdownItems; copyDropdownItems[type] = data; setDropdownItems(copyDropdownItems)})
    })
  }, [dropdownItems])

  const addRow = (row) => {
    setRows(prevRows => [...prevRows, {id: rows.length, ...row}])
  }

  const editRow = (row) => {
    let copyRows = [...rows]
    copyRows[row.id] = {...row}
    setRows(copyRows)
  }

  const deleteRow = (id) => {setRows(prevRows => prevRows.filter(row => row.id !== id))}

  const save = () => {
    const data = rows.map((row, i) => {return `${Object.values(row).join(';')}${i !== rows.length - 1 ? '\n' : ''}`})
    const blob = new Blob(data, {type: 'text/plain;charset=utf-8'})
    saveAs(blob, 'planner.xls')
  }

  const load = () => {
    const file = document.getElementById('file').files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      setRows([])
      let result = reader.result
      result.split('\n').forEach((row, i) => {
        const rowData = row.split(';')
        setRows(prevRows => [...prevRows, {
          id: i,
          catalog: rowData[1], 
          number: rowData[2], 
          constellation: rowData[3], 
          telescope: rowData[4], 
          ccd: rowData[5], 
          filter: rowData[6], 
          ra: rowData[7], 
          dec: rowData[8], 
          info: rowData[9], 
          rotation: rowData[10]
        }])
      })
    }
  }

  return (
    <Container fluid>
      <ListGroup className='mt-3'>
        {rows.map((row, i) => (
          <Row key={i} dropdownItems={dropdownItems} editRow={editRow} deleteRow={deleteRow} data={row} />
        ))}
        <Row dropdownItems={dropdownItems} addRow={addRow} />
      </ListGroup>
      <div className="d-flex justify-content-end p-2">
        <Button variant='light' onClick={save}>Save</Button>
        <Form.Control id='file' type='file' className='w-auto ms-2' onChange={load} />
      </div>
    </Container>
  )
}
