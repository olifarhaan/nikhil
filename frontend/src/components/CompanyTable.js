// src/components/CompanyTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faLinkedin,faTwitter } from '@fortawesome/free-brands-svg-icons';

const CompanyTable = ({ companies, onDelete }) => {
  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/download', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'companies.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading CSV', error);
    }
  };

  return (
    
    <div>

      <Button onClick={handleDownloadCSV} 
      style={{marginLeft: 700, marginTop: 20, 
        border: '2px solid black', padding: '10px 20px', backgroundColor: "#448aff",color: 'white'
      }}>Export as CSV</Button>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell style={{fontSize: 17 , fontFamily: 'sans-serif', fontWeight:'bold'}}>Company</TableCell>
            <TableCell style={{fontSize: 17 , fontFamily: 'sans-serif', fontWeight:'bold'}}>Social Profiles</TableCell>
            <TableCell style={{fontSize: 17 , fontFamily: 'sans-serif', fontWeight:'bold'}}>Description</TableCell>
            <TableCell style={{fontSize: 17 , fontFamily: 'sans-serif', fontWeight:'bold'}}>Address</TableCell>
            <TableCell style={{fontSize: 17 , fontFamily: 'sans-serif', fontWeight:'bold'}}>Phone No.</TableCell>
            <TableCell style={{fontSize: 17 , fontFamily: 'sans-serif', fontWeight:'bold'}}>Email</TableCell>
            <TableCell style={{fontSize: 17 , fontFamily: 'sans-serif', fontWeight:'bold'}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <Link to={`/companies/${company.id}`} style={{ textDecoration: 'none', fontSize: 15, fontFamily: 'sans-serif' }}>{company.name.split(' ')[0]} </Link>
              </TableCell>
              <TableCell style={{fontSize: 16}}>
                {/* Add icons here */}<Link to={`/companies/${company.id}`} style={{ textDecoration: 'none' , color: 'black'}}><FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faTwitter} style={{ marginLeft: 10 }} />
                <FontAwesomeIcon icon={faLinkedin} style={{ marginLeft: 10 }} /></Link>
                
              </TableCell>
              <TableCell style={{fontSize: 17 , fontFamily: 'Fira Sans',}}>{company.description}</TableCell>
              <TableCell style={{fontSize: 15}}>{company.address || "United States"}</TableCell>
              {/* <TableCell>{company.address}</TableCell> */}
              <TableCell style={{fontSize: 15}}>{company.phone || '000-800-919-9589'}</TableCell>
              <TableCell style={{fontSize: 15}}> contact@{company.name.split(' ')[0]}.com</TableCell>
              {/* <TableCell>{company.name}{"@gmail.com"}</TableCell> */}
              <TableCell>
                <Button onClick={() => onDelete(company.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyTable;
