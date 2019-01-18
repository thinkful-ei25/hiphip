import React from 'react';
import { shallow } from 'enzyme';

import CreateShoppingListForm from './create-shopping-list-form';

describe('CreateShoppingListForm', () => {
  it('should render a form', () => {
    const wrapper = shallow(<CreateShoppingListForm />);
    expect(wrapper.find('form').exists()).toBeTruthy();
  });
});
