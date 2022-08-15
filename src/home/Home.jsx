import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  useEffect(() => {document.title = 'Home'})

  const [imgs, setImgs] = useState([])
  const [imgHovered, setImgHovered] = useState()

  useEffect(() => {
      fetch(`${process.env.REACT_APP_API}/home/get-imgs`)
      .then(response => response.json())
      .then(data => setImgs([...data].sort(() => Math.random() - .5)))
  }, [])

  return (
    <Container fluid>
        <Row xxl='4' lg='3' sm='2' xs='1'>
            {imgs.map((img, i) => (
                <Col 
                    key={img.id} 
                    className='p-0 position-relative overflow-hidden' 
                    as={motion.div} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .3, delay: i * .2 }}
                    onMouseEnter={() => setImgHovered(i)}
                    onMouseLeave={() => setImgHovered()}
                >
                    <Link to={`/imgs/${img.id}`}>
                        <motion.img 
                            data-flickr-embed="true"
                            src={img.img} 
                            alt="" 
                            fluid='true' 
                            className='w-100 h-100' 
                            // inital={{ scale: 1 }}
                            animate={{ scale: imgHovered === i ? 1.2 : 1 }}
                            transition={{ duration: .25 }}
                        />
                        <h5 className="position-absolute bottom-0 start-0 text-light p-2">{img.name}</h5>
                    </Link>
                </Col>
            ))}
        </Row>
    </Container>
  )
}
