import React from 'react';
import beer from "../assets/beer.png";

export default function Header({ breweries }) {
  let stateCounts = {};
  for (let i = 0; i < breweries.length; i++) {
    if (stateCounts[breweries[i]["state"]] == undefined) {
      stateCounts[breweries[i]["state"]] = 0;
    }
    stateCounts[breweries[i]["state"]] += 1;
  }


  var sortedStateCounts = Object.keys(stateCounts).map(function(key) {
    return [key, stateCounts[key]];
  });
  // Sort by second value (counts)
  sortedStateCounts.sort(function(first, second) {
    return second[1] - first[1];
  });

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
  </div>
  );
};