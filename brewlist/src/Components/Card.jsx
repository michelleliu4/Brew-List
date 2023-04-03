import { useEffect, useState } from 'react';

export default function Card({ brewery }) {
  const str = "/BreweryDetail/" + brewery.id;

  return (
  <tr key={brewery.id}>
    <td>{brewery.name}</td>
    <td>{brewery.brewery_type}</td>
    <td>{brewery.city}</td>
    <td>{brewery.state}</td>
    <td>{brewery.country}</td>
    <td>
      <a href={str}>Details</a>
    </td>
  </tr>
  );
}