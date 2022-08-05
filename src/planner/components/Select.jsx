import React from 'react'
import Form from 'react-bootstrap/Form'

export default function Select({ value, setValue, name, defaultValue, dropdownItems, className }) {
  return (
    <Form.Select value={value} onChange={setValue} name={name} className={className ?? ''}>
      <option value="">{defaultValue}</option>
      {dropdownItems.map(item => (
        <option key={item.id} value={item.name}>{item.name}</option>
      ))}
    </Form.Select>
  )
}
