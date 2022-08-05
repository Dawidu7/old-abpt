import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Select from './Select'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

export default function ModalForm({ show, row, setRow, dropdownItems, data, buttonFunctions }) {
  const setValue = (e) => {setRow(prevRow => {console.log(prevRow, e.target.name, e.target.value); return {...prevRow, [e.target.name]:e.target.value}})} 

  return (
    <Modal show={show} onHide={buttonFunctions.cancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Row</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className='mb-3'>
          <Form.Label>Catalog</Form.Label>
          <Select value={row.catalog} setValue={setValue} name='catalog' defaultValue={''} dropdownItems={dropdownItems.catalogs} />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Number</Form.Label>
          <Form.Control value={row.number} onChange={setValue} name='number' type='text' />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Constellation</Form.Label>
          <Select value={row.constellation} setValue={setValue} name='constellation' defaultValue={''} dropdownItems={dropdownItems.constellations} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Telescope</Form.Label>
          <Select value={row.telescope} setValue={setValue} name='telescope' defaultValue={''} dropdownItems={dropdownItems.telescopes} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Camera</Form.Label>
          <Select value={row.camera} setValue={setValue} name='camera' defaultValue={''} dropdownItems={dropdownItems.cameras} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Filter</Form.Label>
          <Select value={row.filter} setValue={setValue} name='filter' defaultValue={''} dropdownItems={dropdownItems.filters} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>RA</Form.Label>
          <InputGroup>
            <InputGroup.Text>RA</InputGroup.Text>
            <Form.Control value={row.ra} onChange={setValue} name='ra' type='text' />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DEC</Form.Label>
            <InputGroup>
              <InputGroup.Text>DEC</InputGroup.Text>
              <Form.Control value={row.dec} onChange={setValue} name='dec' type='text' />
            </InputGroup>
          </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Info</Form.Label>
          <Form.Control value={row.info} onChange={setValue} name='info' type='text' />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Angle</Form.Label>
          <InputGroup>
            <Select value={row.rotation} setValue={setValue} name='angle' defaultValue={''} dropdownItems={dropdownItems.angles} />
            <InputGroup.Text>°</InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={data ? buttonFunctions.submitEditRow : buttonFunctions.submitAddRow}>{data ? 'Update' : 'Add'}</Button>
        <Button variant='danger' className='ms-1' onClick={buttonFunctions.cancel}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}
