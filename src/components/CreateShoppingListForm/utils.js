export function queryCreator(word) {
  return word.split(' ').join('+');
}
export function queryCombiner(arr) {
  let query = '';
  arr.forEach((term, i) => {
    if (i !== arr.length - 1) {
      query += term += '%2C+';
    } else {
      query += term;
    }
  });
  return query;
}

export const googleMapsSearch =
  'https://www.google.com/maps/search/?api=1&query=';
