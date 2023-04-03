import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../routes/Layout";

import './BreweryDetail.css';

const BreweryDetail = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState([]);

  useEffect(() => {
    const getBreweryDetail = async () => {
      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries/${params.id}`
      );
      const data = await response.json();
      setFullDetails(data);
    };
    getBreweryDetail().catch(console.error);
  }, []);

  return(
      <div className="brewerydetail">
        <Layout />
        <div className="brewerylist">
          <ul>
            <li>Brewery Name: {fullDetails.name}</li>
            <li>Brewery Type: {fullDetails.brewery_type}</li>
            <li>Address: {fullDetails.address_1}, {fullDetails.city}, {fullDetails.state_province}, {fullDetails.postal_code}</li>
            <li>Phone: {fullDetails.phone}</li>
            <li><a href={fullDetails.website_url}>Website</a></li>
          </ul>
        </div>
      </div>
  )
}


export default BreweryDetail;