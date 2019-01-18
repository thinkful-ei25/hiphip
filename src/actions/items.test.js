import {
  patchItemSuccess,
  patchItemRequest,
  patchItemError,
  toggleChecked,
} from './items';

describe('toggleChecked', () => {
  let fetch;
  const fixture = { id: '001', name: 'Test Name', checked: true };
  const getState = jest.fn(() => ({
    auth: { authToken: 'haha' },
    items: {
      items: [{ ...fixture, checked: false }],
    },
  }));
  const dispatch = jest.fn();

  beforeEach(() => {
    fetch = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => ({ item: fixture }),
      })
    );
  });

  afterEach(() => {
    fetch.mockRestore();
    dispatch.mockClear();
  });

  it('should dispatch a patchItemSuccess action', () => {
    return toggleChecked('001')(dispatch, getState).then(() => {
      expect(dispatch).toBeCalledWith(patchItemRequest('001'));
      expect(fetch).toHaveBeenCalled();
      expect(dispatch).toBeCalledWith(patchItemSuccess(fixture));
      fetch.mockRestore();
    });
  });

  it('should send the itemId and isChecked status', () => {
    return toggleChecked('001')(dispatch, getState).then(() => {
      const fetchOptions = fetch.mock.calls[0][1];
      const payload = JSON.parse(fetchOptions.body);
      expect(payload).toHaveProperty('id');
      expect(payload).toHaveProperty('isChecked');
      fetch.mockRestore();
    });
  });

  it('should dispatch a patchItemError if an error occurs', () => {
    const error = { message: 'Not found', code: 404 };
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(error),
        headers: {
          has: () => true,
          get: () => 'application/json',
        },
      })
    );

    return toggleChecked('001')(dispatch, getState).then(() => {
      expect(dispatch).toBeCalledWith(patchItemError('001', error));
      fetch.mockRestore();
    });
  });
});
