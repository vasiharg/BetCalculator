import React, { useState } from 'react';
import './App.css';
import styled from '@emotion/styled'
import { BetZone } from './components/BetZone';

const Container = styled.div`
  padding: 40px;
  min-height: 100vh;
  width: 100wv;
`;

const Profit = styled.p`
  margin:0;
  font-size: 20px;
  line-height: 24px;
  text-align: right;
  color:beige;
  }
  span {
    font-weight: bold;
  }
`;



function App() {
  const [bets, setBets] = useState([]);

  return (
    <Container>
      <Profit>
        Profit:
        {' '}
        <span>sample</span>
      </Profit>
      <BetZone />

    </Container >
  );
}

export default App;