import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Add from './components/Add'
import DS from './components/DS'
import { saveAs } from 'file-saver'

export default function Generator() {
  useEffect(() => {document.title = 'Generator'})

  const [dss, setDSs] = useState([])
  const [dropdownItems, setDropdownItems] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/generator/get-catalogs`)
    .then(response => response.json())
    .then(data => setDropdownItems([...data]))
  }, [])

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
 
  useEffect(() => {
    const resize = () => {setWindowWidth(window.innerWidth)}

    window.addEventListener('resize', resize)

    return () => {window.removeEventListener('resize', resize)}
  }, [])

  const [alert, setAlert] = useState(true)

  const add = (type, val, title) => {
    if(!val) return

    Array.from(val.split(';')).forEach(name => {
      name = name.trim()
      if(name.includes('-')) {
        const splitName = name.split('-')
        for(let i = parseInt(splitName[0]); i <= parseInt(splitName[1]); i++)
          setDSs(prevDSs => [...prevDSs, {id: type === 'Star' ? 3 : 4, name: `${title ?? ''}${i}`}])
      }
      else setDSs(prevDSs => [...prevDSs, {id: type === 'Star' ? 3 : 4, name: `${title ?? ''}${name}`}])
    })
  }

  const save = () => {
    let data = ['SkySafariObservingListVersion=3.0\n', 'SortedBy=Default Order\n\n']
    Array.from(dss).forEach((ds, i) => {
      data.push('SkyObject=BeginObject\n')
      data.push(`ObjectID=${ds.id}, -1, -1\n`)
      data.push(`CatalogNumber=${ds.name}\n`)
      data.push(`EndObject=SkyObject${i !== dss.length - 1 ? '\n\n' : ''}`)
    }) 
    const blob = new Blob(data, {type: 'text/plain;charset=utf-8'})
    saveAs(blob, 'generator.skylist')
  }

  return (
    <Container fluid>
      {alert && <Alert variant='dark' className='mx-auto mt-3 text-center' onClose={() => setAlert(false)} dismissible>
        Seperate with ; to create multiple (1; 5; 10 gives 1 5 10). Seperate with - to create consecutive (1-5 gives 1 2 3 4 5).
      </Alert>}
      <div className="d-md-flex justify-content-evenly mt-3">
        <div className="bg-dark p-3 h-25 rounded">
          <Add add={add} type='DS' dropdownItems={dropdownItems} />
          <Add add={add} type='Star' />
        </div>
        <div className={`bg-dark p-3 text-light rounded ${windowWidth < 768 && 'mt-3'}`}>
          <Button variant='outline-light' onClick={save}>Save</Button>
          <Button variant='outline-light' className='mx-2' onClick={() => setDSs([])}>Delete All</Button>
          <Button variant='outline-light' onClick={() => {const copyDSs = [...dss]; copyDSs.pop(); setDSs(copyDSs)}}>Delete Last</Button>
          <hr className='text-light' />
          <p>
            SkySafariObservingListVersion=3.0 <br />
            SortedBy=Default Order <br />
          </p>
          {dss.map((ds, i) => (<DS key={i} id={ds.id} name={ds.name} />))}
        </div>
      </div>
    </Container>
  )
}
