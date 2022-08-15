import React from 'react'
import Select from './Select'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

export default function RowForm({ row, setRow, dropdownItems, data, buttonFunctions }) {
  const setValue = (e) => {setRow(prevRow => ({...prevRow, [e.target.name]:e.target.value}))} 

  return (
    <>
    <Select value={row.catalog} setValue={setValue} name='catalog' defaultValue={'Catalog'} dropdownItems={dropdownItems.catalogs} className='me-2 w-50' />
    <Form.Control value={row.number} onChange={setValue} name='number' type='text' className='mx-2 w-50' placeholder='Number' />
    <Select value={row.constellation} setValue={setValue} name='constellation' defaultValue={'Constellation'} dropdownItems={dropdownItems.constellations} className='mx-2' />
    <Select value={row.telescope} setValue={setValue} name='telescope' defaultValue={'Telescope'} dropdownItems={dropdownItems.telescopes} className='mx-2' />
    <Select value={row.camera} setValue={setValue} name='camera' defaultValue={'Camera'} dropdownItems={dropdownItems.cameras} className='mx-2' />
    <Select value={row.filter} setValue={setValue} name='filter' defaultValue={'Filter'} dropdownItems={dropdownItems.filters} className='mx-2 w-50' />
    <InputGroup className='mx-2'>
      <InputGroup.Text>RA</InputGroup.Text>
      <Form.Control value={row.ra} onChange={setValue} name='ra' type='text' />
    </InputGroup>
    <InputGroup className='mx-2'>
      <InputGroup.Text>DEC</InputGroup.Text>
      <Form.Control value={row.dec} onChange={setValue} name='dec' type='text' />
    </InputGroup>
    <Form.Control value={row.info} onChange={setValue} name='info' type='text' className='mx-2' placeholder='Info' />
    <InputGroup className='mx-2'>
      <Select value={row.angle} setValue={setValue} name='angle' defaultValue={'Angle'} dropdownItems={dropdownItems.angles} />
      <InputGroup.Text>°</InputGroup.Text>
    </InputGroup>
    <Button variant='secondary' onClick={data ? buttonFunctions.submitEditRow : buttonFunctions.submitAddRow}>{data ? 'Update' : 'Add'}</Button>
    <Button variant='danger' className='ms-2' onClick={buttonFunctions.cancel}>Cancel</Button>
    </>
  )
}
