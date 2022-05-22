import React, { useState } from 'react';
import './App.css';
import styled from '@emotion/styled'
import { BetZone } from './components/BetZone';
import { BetList } from './components/BetList';
import { Bet } from './types/Bet';
import { toFixed } from './utils/toFixed';

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
  const [bets, setBets] = useState<Bet[]>([]);
  console.log("bets: ", bets);

  let overallProfit = 0;

  if (bets.length > 0) {
    overallProfit = bets.reduce((acc, item: any) => {
      return acc + item.profit;
    }, 0)
  }


  return (
    <Container>
      <Profit>
        Profit:
        {' '}
        <span>{toFixed(overallProfit)}</span>
      </Profit>
      <BetZone bets={bets} setBets={setBets} />
      <BetList bets={bets} setBets={setBets} />
    </Container >
  );
}

export default App;