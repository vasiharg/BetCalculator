import React, { FC, useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { calculateProfit } from "../utils/calculateProfit";
import { isNumber } from "../utils/isNumber";
import { toFixed } from "../utils/toFixed";


const Row = styled.div`
    background-color: #1423d8;
    display: flex;
    margin-top: 15px;
    padding: 5px 10px 15px;
    animation: mymove 5s infinite;
}

@keyframes mymove {
  50% {box-shadow: 5px 5px 20px yellow;}

`
const Column = styled.div`
    
    flex-grow: 1;
    max-width: 25%;
    padding: 0 10px;
`
const Label = styled.label`
    display: block;
    font-size: 16px;
    color: #f7482a;
    font-weight: bold;
    line-height: 24px;
    margin-bottom: 4px;
`
const Input = styled.input`
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 4px 6px;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type=number] {
        -moz-appearance: textfield;
    }

    &:focus {
        outline: none;
    }
`
const ComputedResult = styled.p<any>`
    color: ${props => props.isNegative ? 'red' : ''};
    color: ${props => props.isZero ? 'black' : ''};
    color: ${props => props.isPositive ? '#77ff00' : ''};

    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    margin-top: 25px;
    margin-bottom: 0;
`
const OkButton = styled.button`
    background: #62ce00;
    color: white;
    border: none;
    width: 100px;
    padding: 6px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 24px;
    border-radius: 6px;
    margin-top: 16.1px;
    cursor: pointer;
    &:hover {
        background: #4a9b01; 
    }
`

export const BetZone: FC<any> = (props) => {
    const oddRef = useRef<any>();
    const [stake, setStake] = useState('');
    const [odd, setOdd] = useState('');
    const [estimateProfit, setEstimatedProfit] = useState('');

    useEffect(() => {
        console.log(`${stake} or ${odd} - change occured`);

        if (!isNumber(stake) || !isNumber(odd) || (+odd <= 1) || (+stake <= 0)) {
            setEstimatedProfit('');
            return;
        }
        setEstimatedProfit(`${toFixed(calculateProfit(+stake, +odd))}`);

    }, [stake, odd]);

    let finalEstimated: string;

    if (estimateProfit === '') {
        finalEstimated = '';
    } else if (+estimateProfit > 0) {
        finalEstimated = `+${estimateProfit}`;
    } else {
        finalEstimated = estimateProfit;
    }

    const saveBet = () => {
        props.setBets([...props.bets, { stake: +stake, odd: +odd, profit: +estimateProfit }])
        setStake('');
        setOdd('');
    }

    return (
        <Row>
            <Column>
                <Label htmlFor="stake">
                    Stake
                </Label>
                <Input
                    id="stake"
                    type='number'
                    value={stake}
                    onChange={(e) => {
                        setStake(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (oddRef.current) {
                                oddRef.current.focus();
                            }
                        }
                    }}
                />
            </Column>
            <Column>
                <Label htmlFor="odd">
                    Odd
                </Label>
                <Input
                    id="odd"
                    type='number'
                    value={odd}
                    onChange={(e) => {
                        setOdd(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            saveBet();
                        }
                    }}
                    ref={oddRef}
                />

            </Column>
            <Column>
                <ComputedResult
                    isNegative={+estimateProfit < 0}
                    isZero={+estimateProfit === 0}
                    isPositive={+estimateProfit > 0}
                >
                    {finalEstimated}
                </ComputedResult>
            </Column>
            <Column>
                <OkButton
                    type="button"
                    onClick={saveBet}
                    disabled={estimateProfit === ''}
                >
                    OK
                </OkButton>
            </Column>
        </Row >
    )

}