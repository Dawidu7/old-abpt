import React, { useState, useEffect } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


export default function Add({ add, type, dropdownItems }) {
  const [value, setValue] = useState('')
  const [selectedItem, setSelectedItem] = useState()

  useEffect(() => {dropdownItems && setSelectedItem(dropdownItems[0])}, [dropdownItems])

  return (
    <InputGroup className='mb-2 p-1'>
      {(dropdownItems && selectedItem) && <DropdownButton variant='light' title={selectedItem?.name}>
        {dropdownItems.map(item => (
          <Dropdown.Item key={item.id} onClick={() => setSelectedItem(item)} value={item.value}>{item.name}</Dropdown.Item>
        ))}
      </DropdownButton>}
      <Form.Control value={value} onChange={(e) => {setValue(e.target.value)}} type='text' />
      <Button variant='outline-light' onClick={() => {add(type, value, selectedItem?.value ?? null); setValue('')}}>Add {type}</Button>
    </InputGroup>
  )
}
