// src/components/CompanyDetails.js
//this is done by using the styled-components and it is required to npm install 
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-right: 20px;
`;

const Info = styled.div`
  h1 {
    margin: 0;
    font-size: 24px;
  }

  p {
    margin: 5px 0;

  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Details = styled.div`
  flex: 1;
  margin-right: 20px;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const Screenshot = styled.div`
  flex: 1;
  margin-right: 20px;

  img {
    width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const CompanyDetails = ({ companies }) => {
  const { id } = useParams();
  const company = companies.find((company) => company.id === parseInt(id));

  if (!company) {
    return <div>Company not found</div>;
  }

  // console.log('Company Data:', company); // Log entire company data
  
  return (
    <Container>
      <Header>
      <Logo src={company.logo} alt="Company Logo" onError={(e) => e.target.src = ''} />
        <Info>
          <h1>{company.name}</h1><br/>
          
          <p> Description:- {company.description}</p><br/>
          <p>Phone: {company.phone}</p> <br/>
          <p>Email: contact@{company.name.split(' ')[0]}.com</p>
        </Info>
      </Header>
      <Content>
        <Details>
          <h3>Company Details</h3><br/>
          <p>Email: contact@{company.name.split(' ')[0]}.com</p>
          <br/>
          <p>Facebook: <a href={company.facebook}>{company.facebook}</a></p><br/>
          <p>Instagram: <a href={company.instagram}>{company.instagram}</a></p><br/>
          <p>Twitter: <a href={company.twitter}>{company.twitter}</a></p><br/>
          <p>LinkedIn: <a href={company.linkedin}>{company.linkedin}</a></p><br/>
          <p>Address: {company.address }</p><br/>
        </Details>
        <Screenshot>
          <h3>Screenshot of Webpage</h3>
          <img src={company.screenshot} alt="Website Screenshot" />
        </Screenshot>
      </Content>
    </Container>
  );
};

export default CompanyDetails;
