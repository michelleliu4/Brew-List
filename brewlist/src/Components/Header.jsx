import React from 'react';
import { PieChart, Pie, Legend, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import beer from "../assets/beer.png";

export default function Header({ breweries }) {
  let stateCounts = {};
  for (let i = 0; i < breweries.length; i++) {
    if (stateCounts[breweries[i]["state"]] == undefined) {
      stateCounts[breweries[i]["state"]] = 0;
    }
    stateCounts[breweries[i]["state"]] += 1;
  }

  // Create Rechart counts
  let rechartStateCounts = [];
  const keys = Object.keys(stateCounts);
  for (let i = 0; i < keys.length; i++) {
    rechartStateCounts.push({state: keys[i], count: stateCounts[keys[i]]})
  }

  console.log(rechartStateCounts);


  // Sort by second value (counts)
  var sortedStateCounts = Object.keys(stateCounts).map(function(key) {
    return [key, stateCounts[key]];
  });
  sortedStateCounts.sort(function(first, second) {
    return second[1] - first[1];
  });

  // Find Most State
  let mostState = "0";
  let mostStateCount = "0";

  if (sortedStateCounts.length == 0) {
    mostState = "0";
    mostStateCount = "0";
  }
  else {
    mostState = sortedStateCounts[0][0];
    mostStateCount = sortedStateCounts[0][1];
  }


  return (
  <div className="header">
    <h1>BrewList</h1>
    <p>Number of breweries: {breweries.length}</p>
    <p>State with most breweries: {mostState}</p>
    <p>Number of breweries in {mostState}: {mostStateCount}</p>

    <img src={beer} width="100px"/>
    <div className="linechart1">
      <LineChart width={800} height={300} data={rechartStateCounts}>
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="state" />
        <YAxis />
        <Tooltip />
      </LineChart>

      <PieChart width={400} height={400}>
        <Pie data={rechartStateCounts} dataKey="count" nameKey="state" cx="50%" cy="50%" outerRadius={200} fill="#8884d8" />
        <Tooltip />
      </PieChart>
    </div>
  </div>
  );
};