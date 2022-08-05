import { useLocation, Routes, Route, Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import logo from './static/images/logo.png'
import Home from './home/Home'
import Img from './home/Img'
import Calculator from './calculator/Calculator'
import Generator from './generator/Generator'
import Planner from './planner/Planner'

export default function App() {
  const location = useLocation()
  const isHomePage = location.pathname.split('/')[1] === 'astrophotography-by-patryk-tomalik' || location.pathname.split('/')[1] === 'imgs'

  document.querySelector('html').style.marginBottom = isHomePage ? '72px' : '0'

  return (
    <>
    <Navbar bg='dark' variant='dark' expand='md'>
      <Container fluid>
        {!isHomePage && <Navbar.Brand as={Link} to='/astrophotography-by-patryk-tomalik' className='w-75'><Image src={logo} alt="" fluid='true' /></Navbar.Brand>} 
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav' className='justify-content-end'>
          <Nav>
            <Nav.Link as={Link} to='/calculator'>Calculator</Nav.Link>
            <Nav.Link as={Link} to='/generator'>Generator</Nav.Link>
            <Nav.Link as={Link} to='/planner'>Planner</Nav.Link>
            <Nav.Link as={Link} to='/' disabled>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {isHomePage && <Navbar bg='dark' variant='dark' fixed='bottom'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/astrophotography-by-patryk-tomalik' className='mx-auto'>
          <Image src={logo} alt="" fluid='true' />
        </Navbar.Brand>
      </Container>
    </Navbar>}
    <Routes>
      <Route path='astrophotography-by-patryk-tomalik' element={<Home />} />
      <Route path='astrophotography-by-patryk-tomalik/imgs/:imgId' element={<Img />} />
      <Route path='calculator' element={<Calculator />} />
      <Route path='generator' element={<Generator />} />
      <Route path='planner' element={<Planner />} />
    </Routes>
    </>
  )
}
