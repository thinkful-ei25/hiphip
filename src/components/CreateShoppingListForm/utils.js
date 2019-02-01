export function queryCreator(word) {
  return word.split(' ').join('+');
}

export const googleMapsSearch =
  'https://www.google.com/maps/search/?api=1&query=';
