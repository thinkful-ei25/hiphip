const initialState = {
  id: 2,
  name: 'Fiesta',
  storeAddress: '123 4th Street zip 56789',
  items: [
    { name: 'pears', aisle: 'produce', checked: false, id: 1234 },
    { name: 'mill', aisle: 'dairy', checked: true, id: 1224 },
    { name: 'corn tortillas', aisle: 2, checked: true, id: 1124 },
    { name: 'incense', aisle: null, checked: false, id: 1344 },
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
