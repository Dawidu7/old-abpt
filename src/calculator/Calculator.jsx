import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputCol from './components/InputCol'

export default function Calculator() {
  useEffect(() => {document.title = 'Calculator'})

  // Data
  const [cameras, setCameras] = useState([])
  const [telescopes, setTelescopes] = useState([])
  const [flattReducs, setFlattReducs] = useState([])
  const [selectedCamera, setSelectedCamera] = useState(0)
  const [selectedTelescope, setSelectedTelescope] = useState(0)
  const [selectedFlattReduc, setSelectedFlattReduc] = useState(0)

  // Get Data
  useEffect(() => {
    getData('camera', setCameras)
    getData('telescope', setTelescopes)
    getData('flatt-reduc', setFlattReducs)
  }, [])

  const getData = async (api, func) => {
    fetch(`${process.env.REACT_APP_API}/calculator/get-${api}s`)
    .then(response => response.json())
    .then(data => func(data))
  }

  // Info
  const [camera, setCamera] = useState()
  const [telescope, setTelescope] = useState()
  const [flattReduc, setFlattReduc] = useState()
  const [focalRatio, setFocalRatio] = useState(0)
  const [resolution, setResolution] = useState(0)
  const [fov, setFOV] = useState({x: 0, y: 0})

  // Set Info
  useEffect(() => {setCamera(cameras[selectedCamera - 1])}, [selectedCamera, cameras])
  useEffect(() => {setTelescope(telescopes[selectedTelescope - 1])}, [selectedTelescope, telescopes])
  useEffect(() => {setFlattReduc(flattReducs[selectedFlattReduc - 1])}, [selectedFlattReduc, flattReducs])

  useEffect(() => {setFocalRatio(Math.round((telescope?.focal_ratio * flattReduc?.times) * 100) / 100)}, [telescope, flattReduc])
  useEffect(() => {setResolution(Math.round(((camera?.pixel_size / telescope?.focal_length * 206.265) * flattReduc?.times) * 100) / 100)}, [camera, telescope, flattReduc])
  useEffect(() => {setFOV({x: Math.round((camera?.res_x * resolution / 3600) * 100) / 100, y: Math.round((camera?.res_y * resolution / 3600) * 100) / 100})}, [camera, resolution])

  // Window Width
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resize = () => (setWidth(window.innerWidth))

    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <Container className='mt-3'>
      <Row className='bg-dark rounded'>
        {/* Left Panel */}
        <Col lg='2' className='border-lg-end border-bottom border-lg-bottom-0 p-4'>
          <div className="mb-5">
            <Form.Select size='sm' value={selectedCamera} onChange={e => setSelectedCamera(parseInt(e.target.value))} className='mb-2'>
              <option value="0">Camera</option>
              {cameras.map((camera, i) => (<option key={i} value={i + 1}>{camera.name}</option>))}
            </Form.Select>
            <Form.Select size='sm' value={selectedTelescope} onChange={e => setSelectedTelescope(parseInt(e.target.value))} className='mb-2'>
              <option value="0">Telescope</option>
              {telescopes.map((telescope, i) => (<option key={i} value={i + 1}>{telescope.name}</option>))}
            </Form.Select>
            <Form.Select size='sm' value={selectedFlattReduc} onChange={e => setSelectedFlattReduc(parseInt(e.target.value))}>
              <option value="0">Flatt/Reduc</option>
              {flattReducs.map((flattReduc, i) => (<option key={i} value={i + 1}>{flattReduc.name}</option>))}
            </Form.Select>
          </div>
        </Col>
        {/* Right Panel */}
        <Col>
          <div className="border-bottom p-4">
            <Row className='mb-2'>
              {width < 768 && <Form.Label className='text-light'>Camera</Form.Label>}
              <InputCol text={'Resolution'} value={camera ? `${camera.res_x}x${camera.res_y}` : ''} />
              <InputCol text={'Matrix Size'} value={camera?.matrix_size || ''} />
              <InputCol text={'Pixel Size'} value={camera?.pixel_size || ''} />
            </Row>
            <Row className='mb-2'>
              {width < 768 && <Form.Label className='text-light'>Telescope</Form.Label>}
              <InputCol text={'Focal Length'} value={telescope?.focal_length || ''} />
              <InputCol text={'Aperture'} value={telescope?.aperture || ''} />
              <InputCol text={'Focal Ratio'} value={telescope?.focal_ratio || ''} />
            </Row>
            <Row className='mb-2'>
              {width < 768 && <Form.Label className='text-light'>Flatt/Reduc</Form.Label>}
              <InputCol text={'Times'} value={flattReduc?.times || ''} />
            </Row>
          </div>
          <div className='p-4'>
            <Row>
              <InputCol text={'Focal Ratio'} value={focalRatio || ''} />
              <InputCol text={'Resolution'} value={resolution || ''} />
              <InputCol text={'FOV'} value={Object.values(fov).every(value => value) ? `${fov.x}x${fov.y}` : ''} />
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}