import React from 'react';
import { getDistanceSimple } from 'geolib';

import DistanceDisplay from '../DistanceDisplay';

export default function CoordinateDistance({ userLocation, point }) {
  if (!userLocation || !point) {
    return null;
  }

  // Destructuring is necessary because geolib assumes it is passed a simple
  // object, rather than a WebAPI `Coordinates` object which has
  // readonly/non-enumerable properties
  const { latitude, longitude } = userLocation;
  const distanceInMeters = getDistanceSimple({ latitude, longitude }, point);

  return <DistanceDisplay meters={distanceInMeters} />;
}
