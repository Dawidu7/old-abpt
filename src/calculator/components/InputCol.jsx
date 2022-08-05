import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

export default function InputCol({ text, value }) {
  return (
    <Col md='4'>
      <InputGroup size='sm'>
        <InputGroup.Text>{text}</InputGroup.Text>
        <Form.Control readOnly value={value} />
      </InputGroup>
    </Col>
  )
}