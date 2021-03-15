import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

import { FaCloudversify, FaSpinner, FaCloudRain, FaArrowDown, FaArrowUp, FaCloud } from 'react-icons/fa'

function App() {
  const [cidade, setCidade] = useState('')
  const [clima, setClima] = useState(null)

  async function obtemClima(cidade){
    const apiweather = process.env.REACT_APP_APIWEATHER
    let urlClima=`http://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt&units=metric&appid=${apiweather}`
    await fetch(urlClima)
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      setClima(data)
    })
    .catch(function (error){
      console.error(`Erro ao obter o clima: ${error.mesage}`)
    })
  }

  return (
    <> {/*React Fragment*/}
      <Navbar bg="primary">
        <Navbar.Brand href="#inicio">Fateclima</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#inicio"> Inicio</Nav.Link>
          <Nav.Link href="#contato">Contato</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" value={cidade} placeholder="Informe a cidade..."
          onChange={event => setCidade(event.target.value)} />
          &nbsp;
          <Button variant="secondary" onClick={() => obtemClima(cidade)}><FaCloudversify color="#000000" size="20"/> Obter Clima</Button>
        </Form>
      </Navbar>
      <Jumbotron>
        <h1><FaCloudRain/>FateClima</h1>
        <p>
          Consulte o clima de qualquer cidade do mundo. <br></br>
        App desenvolvido em ReactJS e integrado com a API OpenWheaterMap.
      </p>
      </Jumbotron>
      <Row className="justify-content-center">
        {clima &&
        <Card bg="primary" className="text-center">
          <Card.Header>
            <h2>{clima.name}</h2>
            <h3>{clima.main.temp}&#x2102;</h3>
            <h5>min:  {clima.main.temp_min} max:{clima.main.temp_max}</h5>
          </Card.Header>
          <Card.Body>
            <Card.Title>Previsão do Tempo</Card.Title>
          </Card.Body>

        <Card.Footer className="text-white">
          Atualizado em:
        </Card.Footer>
        </Card>
        }
      </Row>
    </>
  )
}

export default App;