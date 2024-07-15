// src/components/UrlForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const UrlForm = ({ onScrapeSuccess }) => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleFetchDetails = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/scrape', { url });
      onScrapeSuccess(response.data);
      navigate('/companies');
    } catch (error) {
      console.error('Error fetching details', error);
    }
  };

  return (
    <div>
      <TextField
        label="Enter domain URL"
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{marginLeft: 600, marginTop:200,width:400,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
         }}
      />
      <br/>
      <br/>
      <Button variant="contained" color="primary" onClick={handleFetchDetails}
      style={{marginLeft: 700, marginTop: 20,}}>
        Fetch & Save Details
      </Button>
    </div>
  );
};

export default UrlForm;
