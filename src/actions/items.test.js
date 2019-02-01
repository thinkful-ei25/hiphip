import {
  patchItemSuccess,
  patchItemRequest,
  patchItemError,
  patchItem,
  deleteItemRequest,
  deleteItemSuccess,
  deleteItemError,
  deleteItem,
} from './items';

import { API_BASE_URL } from '../config';

describe('patchItem', () => {
  let fetch;
  const fixture = { id: '001', name: 'Test Name', isChecked: true };
  const originalItem = { ...fixture, isChecked: false };
  const getState = jest.fn(() => ({
    auth: { authToken: 'haha' },
    items: {
      items: [{ ...fixture, isChecked: false }],
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
    return patchItem(originalItem, fixture)(dispatch, getState).then(() => {
      expect(dispatch).toBeCalledWith(patchItemRequest(originalItem, fixture));
      expect(fetch).toHaveBeenCalled();
      expect(dispatch).toBeCalledWith(patchItemSuccess(fixture));
      fetch.mockRestore();
    });
  });

  it('should send the itemId and isChecked status', () => {
    return patchItem(originalItem, fixture)(dispatch, getState).then(() => {
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

    return patchItem(originalItem, fixture)(dispatch, getState).then(() => {
      expect(dispatch).toBeCalledWith(patchItemError('001', error));
      fetch.mockRestore();
    });
  });
});

describe('deleteItem', () => {
  let fetch;
  const dispatch = jest.fn();
  const getState = jest.fn(() => ({
    auth: { authToken: 'haha' },
  }));

  beforeAll(() => {
    fetch = jest.spyOn(global, 'fetch');
  });

  afterAll(() => {
    fetch.mockRestore();
  });

  beforeEach(() => {
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => ({
          items: [],
        }),
      })
    );
  });

  afterEach(() => {
    fetch.mockClear();
    dispatch.mockClear();
  });

  it('should dispatch a deleteItemRequest', () => {
    return deleteItem('1', 'listid')(dispatch, getState).then(() => {
      expect(dispatch).toBeCalledWith(deleteItemRequest('1'));
    });
  });

  it('should dispatch a deleteItemSuccess on success', () => {
    return deleteItem('1', 'listid')(dispatch, getState).then(() => {
      expect(dispatch).toBeCalledWith(deleteItemSuccess([]));
    });
  });

  it('should dispatch a deleteItemError with the id and error', () => {
    const error = { message: 'Internal server error', code: 500 };

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

    return deleteItem('1', 'listid')(dispatch, getState).then(() => {
      expect(dispatch).toBeCalledWith(deleteItemError('1', error));
    });
  });

  it('should send a fetch request to the correct url', () => {
    return deleteItem('itemId', 'listId')(dispatch, getState).then(() => {
      expect(fetch).toBeCalledWith(
        `${API_BASE_URL}/api/lists/listId/items/itemId`,
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            Authorization: expect.any(String),
          }),
        })
      );
    });
  });
});
