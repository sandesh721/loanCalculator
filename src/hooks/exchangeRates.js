import axios from 'axios';
import { useState, useEffect } from 'react';


const API_KEY = process.env.REACT_APP_API_KEY;

const ExchangeRate = (base='USD') =>{
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchRates = async() =>{

        try {
            const response = await axios.get(
                `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`
              );
            console.log(response);
            setRates(response.data.conversion_rates);
            setLoading(false);
            
        } catch (error) {
            console.error('Exchange rate fetch error:', error);
            setLoading(false);
        }
      }
      fetchRates();
    }, [base]);

    return{rates, loading};
    
}

export default ExchangeRate;