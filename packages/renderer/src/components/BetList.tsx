import React, { FC } from "react";
import styled from "@emotion/styled";
import { Bet } from "../types/Bet";

const Table = styled.table`
    margin-top: 40px;
    background-color: white;
    width: 100%;
    border: 1px solid black;
    border-collapse: collapse;
    text-align: left;
    table-layout: fixed;

`
const Row = styled.tr`
`
const HeaderCell = styled.th`
border: 1px solid black;
padding: 4px 8px;
max-width: 28%;
&:first-child{
    width: 16%;
}
`
const Cell = styled.td`
border: 1px solid black;
padding: 4px 8px;
max-width: 28%;
&:first-child{
    width: 16%;
}
`
const ProfitCell = styled<any>(Cell)`
    color: ${props => props.isNegative ? 'red' : ''};
    color: ${props => props.isZero ? 'black' : ''};
    color: ${props => props.isPositive ? '#1ee636' : ''};
    font-weight: 500;
`

interface BetListProps {
    bets: Bet[]
    setBets: (bet: Bet[]) => void
}
export const BetList: FC<BetListProps> = ({ bets, setBets }) => {

    return (
        <Table>
            <thead>
                <Row>
                    <HeaderCell>#</HeaderCell>
                    <HeaderCell>Stake</HeaderCell>
                    <HeaderCell>Odd</HeaderCell>
                    <HeaderCell>Profit</HeaderCell>
                </Row>
            </thead>
            <tbody>
                {bets.map((bet, index) => (
                    <Row>
                        <Cell>{index + 1}</Cell>
                        <Cell>{bet.stake}</Cell>
                        <Cell>{bet.odd}</Cell>
                        <ProfitCell
                            isNegative={bet.profit < 0}
                            isZero={bet.profit === 0}
                            isPositive={bet.profit > 0}
                        >{bet.profit > 0 ? `+${bet.profit}` : bet.profit}</ProfitCell>
                    </Row>
                ))}
            </tbody>
        </Table>

    )
};