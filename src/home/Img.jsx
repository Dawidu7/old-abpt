import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'

export default function Img() {
  const { imgId } = useParams()

  const [img, setImg] = useState()
  const [imgVisible, setImgVisible] = useState(false)
  const [annotationVisible, setAnnotationVisible] = useState(false)

  useEffect(() => {document.title = img?.name ?? 'Img'})

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/home/get-img/${imgId}`)
    .then(response => response.json())
    .then(data => setImg(data))
  }, [imgId])

  return (
    <>
    <Container className='text-light' fluid='md'>
      <div className='text-center py-2'>
        <h1 className='mt-3'>{img?.name}</h1>
      </div>
      <hr className='text-dark mt-0' />
      <button onClick={() => setImgVisible(true)} className='w-100 h-auto m-0 p-0 border-0'>
        <Image src={img?.img} alt="" fluid='true' className='w-100 h-100' />
      </button>
      <Row className="bg-dark p-2 my-3 w-100 mx-auto">
        <Col sm='6' className='border-sm-end border-sm-bottom-0 border-bottom border-light p-2'>
          <h4>TECH SPEC:</h4>
          <hr />
          <Row className='px-2'>
            <Col xs='4'>Optic:</Col> <Col xs='8' className='mb-1'>{ img?.optic }</Col>
            <Col xs='4'>Camera:</Col> <Col xs='8' className='mb-1'>{ img?.camera }</Col>
            <Col xs='4'>Mount:</Col> <Col xs='8' className='mb-1'>{ img?.mount }</Col>
            <Col xs='4'>Filters:</Col> <Col xs='8' className='mb-1'>{ img?.filters }</Col>
            <Col xs='4'>Dates/Times:</Col> <Col xs='8' className='mb-1'>{ img?.dates_times }</Col>
            <Col xs='4'>SQML:</Col> <Col xs='8' className='mb-1'>{ img?.sqml }</Col>
            <Col xs='4'>Exposure Details:</Col> <Col xs='8' className='mb-1'>{ img?.exposure_details }</Col>
            <Col xs='4'>Acquisition:</Col> <Col xs='8' className='mb-1'>{ img?.acquisition }</Col>
            <Col xs='4'>Processing:</Col> <Col xs='8' className='mb-1' sm='8'>{ img?.processing }</Col>
          </Row>
        </Col>
        <Col sm='6' className='p-2'>
          <h4>INFO:</h4>
          <hr />
          <p>{ img?.info }</p>
          <button onClick={() => setAnnotationVisible(true)} className='w-50 h-auto m-0 p-0 border-0'>
            <Image src={img?.annotation} alt="" fluid='true' className='w-100 h-100' />
          </button>
        </Col>
      </Row>
    </Container>
    <Modal centered show={imgVisible} onHide={() => {setImgVisible(false)}}>
      <Modal.Body className='p-0'>
        <Image src={img?.img} alt="" fluid='true' className='w-100' />
      </Modal.Body>
    </Modal>
    <Modal centered show={annotationVisible} onHide={() => {setAnnotationVisible(false)}}>
      <Modal.Body className='p-0'>
        <Image src={img?.annotation} alt="" fluid='true' className='w-100' />
      </Modal.Body>
    </Modal>
    </>
  )
}
