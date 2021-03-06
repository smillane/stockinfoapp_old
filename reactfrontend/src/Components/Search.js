import { useState, useEffect } from 'react';
import { SearchRounded } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import '../Styles/Search.css';
import Button from '@material-ui/core/Button';
import styled from "styled-components";
import { Box, Container, Typography, TableCell, TableHead, TableBody } from '@material-ui/core';

const StyledMainDiv = styled.div`
  margin-top: 5%;
  padding-bottom: 5%;
  max-width: 1080px;
  min-height: 75vh;
`;


function Search (props) {
  const [input, setInput] = useState('');
  const [stockInfo, setStockInfo] = useState([]);
  const [insiderTrading, setInsiderTrading] = useState([]);
  const [insiderTradingCount, setInsiderTradingCount] = useState(3);

  const fetchDatastockInfo = async () => {
    return await fetch(`/stocks/${input}`)
    .then(response => response.json())
    .then(data => { 
      setStockInfo(data)
    }).catch(err => {
      console.log("Error Reading data " + err)
  })}

  const fetchDataInsiderTrading = async () => {
    return await fetch(`/InsiderTrading/${input}`)
    .then(response => response.json())
    .then(data => { 
      setInsiderTrading(data)
    }).catch(err => {
      console.log("Error Reading data " + err)
  })}

  useEffect(() => {fetchDatastockInfo()},[])
  useEffect(() => {fetchDataInsiderTrading()},[])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetchDatastockInfo();
    fetchDataInsiderTrading();
    setInsiderTradingCount(3);
  }

  function isBoolean(val) {
    if (val === true) {return 'Yes';}
    return 'No';
  }
  
  return (
    <Container>
      <StyledMainDiv>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Search"
            id="input-with-icon-adornment"          
            startAdornment={
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            }
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </form>
        {(() => {if (stockInfo.length !== 0) {
          return (
            <div>
              <Box className='stock-info'>
                <Typography variant='h3' gutterBottom>{stockInfo.companyName}</Typography>
                <Typography variant='h4' gutterBottom>Price: {stockInfo.latestPrice}</Typography>
                <Typography variant='h5' gutterBottom>Change: {stockInfo.change}, {(stockInfo.changePercent * 100).toFixed(2)}%</Typography>
                <Typography variant='h5' gutterBottom>Volume: {(stockInfo.latestVolume).toLocaleString()}</Typography>
                <Typography variant='h5'>Avg Volume: {(stockInfo.avgTotalVolume).toLocaleString()}</Typography>
              </Box>

              <Box className='stock-info border-top'>
                <Typography variant='h5'>Dividends</Typography>
                <Typography variant='body1' gutterBottom>Amount: </Typography>
                <Typography variant='body1' gutterBottom>Frequency: </Typography>
                <Typography variant='body1' gutterBottom>Dividend Payment Date: </Typography>
                <Typography variant='body1' gutterBottom>Dividend Record Date: </Typography>
              </Box>
              
              <TableContainer className='stock-info border-top'>
                <h2>Insider Trades</h2>                
                <Table className="insider-trades-table" aria-label="customized table">                  
                  <TableHead>
                    <TableRow>
                      <TableCell>Insider Name:</TableCell>
                      <TableCell>Insider Title:</TableCell>
                      <TableCell>Transaction Date:</TableCell>
                      <TableCell>Transaction Type:</TableCell>
                      <TableCell>Predetermined Trade:</TableCell>
                      <TableCell>Transaction Size (in shares):</TableCell>
                      <TableCell>Shares Remaining:</TableCell>
                    </TableRow>
                  </TableHead>
                  {insiderTrading.slice(0, insiderTradingCount).map((trade) => (
                  <TableBody key={trade.date}>
                    <TableRow>
                      <TableCell>{trade.fullName}</TableCell>
                      <TableCell>{trade.reportedTitle}</TableCell>
                      <TableCell>{trade.transactionDate}</TableCell>
                      <TableCell>{trade.transactionCode}</TableCell>
                      <TableCell>{isBoolean(trade.is10b51)}</TableCell>                  
                      <TableCell>{(trade.transactionShares).toLocaleString()}</TableCell>
                      <TableCell>{(trade.postShares).toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
                </Table>
              </TableContainer>
              <br />
              <Button variant="contained" onClick={() => setInsiderTradingCount(insiderTradingCount + 3)}>Show More Transactions</Button>
            </div>
            )
          }
        })()}
      </StyledMainDiv>
    </Container>
  );
}

export default Search