import React from 'react';

export default function DistanceDisplay({ meters }) {
  const miles = Math.floor((meters / 1609.344) * 100) / 100;
  const feet = Math.floor((miles * 5280) / 100) * 100;

  if (miles <= 0.5) {
    return <span className="Distance Distance--feet">{feet}ft</span>;
  }

  return <span className="Distance Distance--miles">{miles}mi</span>;
}
