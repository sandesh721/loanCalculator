import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, CircularProgress } from "@mui/material";
import ExhangeRate from "../hooks/exchangeRates"; 
import NavBar from "./navbar"; 
const ExchangeRatesPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  
  const { rates, loading } = ExhangeRate('USD'); 

  const totalRecords = Object.keys(rates).length;

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); 
  };

 
  const paginatedRates = Object.entries(rates).slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <>
    <NavBar />
    
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Live Exchange Rates
      </Typography>

     
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Currency</strong></TableCell>
                <TableCell align="right"><strong>Rate (USD)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRates.map(([currency, rate]) => (
                <TableRow key={currency}>
                  <TableCell>{currency}</TableCell>
                  <TableCell align="right">{rate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
    </>
  );
};

export default ExchangeRatesPage;
