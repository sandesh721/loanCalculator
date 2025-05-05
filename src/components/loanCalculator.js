import { useState } from "react";
import ExhangeRate from "../hooks/exchangeRates";
import "../css/loanCalculator.css";
import {Container,Typography,TextField,Grid,Button,Select,MenuItem,InputLabel,FormControl,Table,TableHead,TableRow,TableCell,TableBody,Paper,TableContainer, CircularProgress} from "@mui/material";
import Navbar from "./navbar";
function LoanCalculator(){
const [loanData, setLoanData] = useState({
    Amount:"100000",
    Rate:"8.5",
    Term:"5",
});
const [errors, setErrors] = useState({
    Amount:"",
    Rate:"",
    Term:"",
});
const [emi, setEmi] = useState(null);
const [schedule, setSchedule] = useState([]);
const [currency, setCurrency] = useState("USD");

const {rates, loading} = ExhangeRate("USD");
const allowedCurrencies = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];
const handleChange = (e) =>{
    const {name, value} = e.target;
    let error="";
    if(value===""){
        error = "Required";
    }
    else if(isNaN(value)){
        error="Must be a number";
    }
    else if(parseFloat(value)<=0){
        error = "Must be greater then 0";
    }
    setErrors({...errors, [name]:error});
    setLoanData({...loanData, [name]:value});
}
const calculateEMI = () => {
    if (loading || !rates[currency] || errors.Amount ||errors.Rate || errors.Term ||!loanData.Amount||!loanData.Rate||!loanData.Term) return;
    console.log(loanData.Amount);
    console.log(emi);
    const loanAmountInSelectedCurrency = currency === "USD"
      ? parseFloat(loanData.Amount)
      : parseFloat(loanData.Amount);
    const P = loanAmountInSelectedCurrency;
    const r = parseFloat(loanData.Rate) / 12 / 100;
    const n = parseFloat(loanData.Term) * 12;


    const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(emiValue.toFixed(2));

    let balance = P;
    const newSchedule = [];

    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = emiValue - interest;
      balance -= principal;

      newSchedule.push({
        month: i,
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : "0.00",
      });
    }

    setSchedule(newSchedule);
  };

  const reset = () =>{
    setLoanData({Amount:"", Rate:"", Term:""});
    setCurrency("USD");
    setEmi(null);
    setSchedule([]);
  }

  
    return(
        <>
        <Navbar/>
        <Container maxWidth="md" sx={{ mt: 4, mb:5 }}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Loan Amount"
            name="Amount"
            value={loanData.Amount}
            onChange={handleChange}
            fullWidth
            type="number"
            error={Boolean(errors.Amount)}
            helperText={errors.Amount}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Interest Rate (%)"
            name="Rate"
            value={loanData.Rate}
            onChange={handleChange}
            fullWidth
            type="number"
            error={Boolean(errors.Rate)}
            helperText={errors.Rate}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Term (Years)"
            name="Term"
            value={loanData.Term}
            onChange={handleChange}
            fullWidth
            type="number"
            error={Boolean(errors.Term)}
            helperText={errors.Term}
          />
        </Grid>

      </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={calculateEMI} sx={{mt:2}}>
            Calculate
          </Button>
         
        </Grid>

      {emi && (
        <>
          <Typography variant="h5" mt={4}>
            Monthly EMI: {emi} {currency}
          </Typography>
        <div className="button">

          <FormControl fullWidth sx={{ mt: 2, maxWidth: 200 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              label="Currency"
              onChange={(e) => setCurrency(e.target.value)}
              >
              {allowedCurrencies.map((curr) => (
                  <MenuItem key={curr} value={curr}>
                  {curr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined"  sx={{ color: 'purple', borderColor: 'purple', '&:hover': { borderColor: 'darkviolet', color: 'darkviolet' } }} onClick={reset}>
            Reset Table
          </Button>
        </div>
          <Typography variant="h6" mt={4}>
            Amortization Schedule ({currency})
          </Typography>

          <TableContainer component={Paper} sx={{ maxHeight: 300, mt: 2 }}>
  <Table stickyHeader>
    <TableHead>
      <TableRow>
        <TableCell>Month</TableCell>
        <TableCell>Principal</TableCell>
        <TableCell>Interest</TableCell>
        <TableCell>Remaining Balance</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {schedule.map((row) => (
        <TableRow key={row.month}>
          <TableCell>{row.month}</TableCell>
          <TableCell>
            {row.principal} {currency}
          </TableCell>
          <TableCell>
            {row.interest} {currency}
          </TableCell>
          <TableCell>
            {row.balance} {currency}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
        </>
      )}
    </Container>
  </>
  );
}
export default LoanCalculator;