import React, { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import RowForm from './RowForm'
import ModalForm from './ModalForm'

export default function Row({ dropdownItems, addRow, editRow, deleteRow, data }) {
  const [isAdd, setIsAdd] = useState(data === undefined)
  const [isEdit, setIsEdit] = useState(false)

  const [row, setRow] = useState({
    catalog: data?.catalog ?? 'Catalog',
    number: data?.number ?? '',
    constellation: data?.constellation ?? 'Constellation',
    telescope: data?.telescope ?? 'Telescope',
    camera: data?.camera ?? 'Camera',
    filter: data?.filter ?? 'Filter',
    ra: data?.ra ?? '',
    dec: data?.dec ?? '',
    info: data?.info ?? '',
    angle: data?.angle ?? 'Angle'
  })

  const [windowWidthForm, setWindowWidthForm] = useState(window.innerWidth)
 
  useEffect(() => {
    const resize = () => {setWindowWidthForm(window.innerWidth)}

    window.addEventListener('resize', resize)

    return () => {window.removeEventListener('resize', resize)}
  }, [])

  const handleAddClick = () => {
    if(!Object.values(dropdownItems).every(item => item === null)) {
      setIsAdd(false)
      setIsEdit(true)
    }
  } 

  const reset = () => {
    setRow({
      catalog: data?.catalog ?? 'Catalog',
      number: data?.number ?? '',
      constellation: data?.constellation ?? 'Constellation',
      telescope: data?.telescope ?? 'Telescope',
      camera: data?.camera ?? 'Camera',
      filter: data?.filter ?? 'Filter',
      ra: data?.ra ?? '',
      dec: data?.dec ?? '',
      info: data?.info ?? '',
      angle: data?.angle ?? 'Angle'
    })
  }

  const getRowData = () => {
    return {
      ...row,
      catalog: row?.catalog !== 'Catalog' && row.catalog,
      constellation: row?.constellation !== 'Constellation' && row.constellation,
      telescope: row?.telescope !== 'Telescope' && row.telescope,
      camera: row?.camera !== 'Camera' && row.camera,
      filter: row?.filter !== 'Filter' && row.filter,
      angle: row?.angle !== 'Angle' && row.angle,
    }
  }

  const submitAddRow = () => {
    addRow(getRowData())
    reset()
    setIsAdd(true)
  }

  const submitEditRow = () => {
    editRow({id: data.id, ...getRowData()})
    reset()
    setIsEdit(false)
  }

  const cancel = () => {
    setIsEdit(false)
    if(data === undefined) setIsAdd(true)
    reset()
  }

  const attributes = {
    row: row,
    setRow: setRow,
    dropdownItems: dropdownItems,
    data: data,
    buttonFunctions: {
      submitAddRow: submitAddRow,
      submitEditRow: submitEditRow,
      cancel: cancel
    }
  }

  return (
    <ListGroup.Item variant='dark' className='d-flex justify-content-between align-items-center'>
      {isAdd ? <Button variant='outline-dark' className='border-0 w-100' onClick={handleAddClick}>+</Button>
      : isEdit ?  
        windowWidthForm >= 1800 ?
        <RowForm {...attributes} /> : <ModalForm show={isEdit} {...attributes} /> 
      : <>
      <span>{data.catalog}</span>
      <span>{data.number}</span>
      <span>{data.constellation}</span>
      <span>{data.telescope}</span>
      <span>{data.camera}</span>
      <span>{data.filter}</span>
      <span>{data.ra ? 'RA ' : ''}{data.ra}</span>
      <span>{data.dec ? 'DEC ' : ''}{data.dec}</span>
      <span>{data.info}</span>
      <span>{data.angle}{data.angle ? '°' : ''}</span>
      <div>
        <Button variant='success' onClick={() => setIsEdit(true)}>Edit</Button>
        <Button variant='danger' className='ms-1' onClick={() => deleteRow(data.id)}>Delete</Button>
      </div>
      </>}
    </ListGroup.Item>
  )
}
