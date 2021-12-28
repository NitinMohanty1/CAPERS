import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import '../Home.css';

export default function Home() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const startGame = () => {
    const params = new URLSearchParams();
    if (name) {
      params.append("name", name);
    } else {
      params.delete("name");
    }
    navigate({ pathname: '/question', search: params.toString() });
  };

  return (
    <div class="contentmain">
      <div style={{paddingTop: '20%', paddingLeft: '40%', paddingBottom: '23%'}}>
        <InputGroup className="mb-3" style={{ width: '30%' }}>
          <FormControl
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter Your Team Name"
          />
        </InputGroup>
        <Button variant="primary" style={{ width: '30%' }} disabled={!name} onClick={() => startGame()}>Start Game</Button>
      </div>
    </div>
  )
}
