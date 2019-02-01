import React from 'react';

export default function DistanceDisplay({ meters }) {
  let miles = Math.floor((meters / 1609.344) * 100) / 100;
  const feet = Math.floor((miles * 5280) / 100) * 100;

  if (miles > 50) {
    miles = Math.round(miles);
  } else if (miles > 10) {
    miles = Math.floor(miles * 10) / 10;
  }

  if (miles <= 0.5) {
    return <span className="Distance Distance--feet">{feet} ft</span>;
  }

  return <span className="Distance Distance--miles">{miles} mi</span>;
}
