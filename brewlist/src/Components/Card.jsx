import { useEffect, useState } from 'react';

export default function Card({ brewery }) {
  return (
  <tr key={brewery.id}>
    <td>{brewery.name}</td>
    <td>{brewery.brewery_type}</td>
    <td>{brewery.city}</td>
    <td>{brewery.state}</td>
    <td>{brewery.country}</td>
  </tr>
  );
}