import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlForm from './components/UrlForm';
import CompanyTable from './components/CompanyTable';
import CompanyDetails from './components/CompanyDetails';
import axios from 'axios';
import GlobalStyles from './GlobalStyles';

const App = () => {
  const [companies, setCompanies] = useState([]);

  const handleScrapeSuccess = (company) => {
    setCompanies([...companies, company]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/companies/${id}`);
      setCompanies(companies.filter((company) => company.id !== id));
    } catch (error) {
      console.error('Error deleting company', error);
    }
  };

  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<UrlForm onScrapeSuccess={handleScrapeSuccess} />} />
        <Route
          path="/companies"
          element={<CompanyTable companies={companies} onDelete={handleDelete} />}
        />
        <Route path="/companies/:id" element={<CompanyDetails companies={companies} />} />
      </Routes>
    </Router>
  );
};

export default App;
