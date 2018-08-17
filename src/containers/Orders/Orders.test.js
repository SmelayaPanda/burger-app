import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {Orders} from './Orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import Order from '../../components/Order/Order'


configure({adapter: new Adapter()})

describe('<Orders />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Orders ingredients={{}} orders={[]} onOrdersFetch={() => {
    }}/>)
  })
  it('should render <Spinner /> if loading', () => {
    wrapper.setProps({loading: true})
    expect(wrapper.find(Spinner)).toHaveLength(1)
  });

  it('should render <Order /> if NOT loading', () => {
    wrapper.setProps({loading: false})
    wrapper.setProps({ingredients: {salad: 0}})
    wrapper.setProps({orders: [{id: 1}]})
    expect(wrapper.find(Order)).toHaveLength(1)
  });
})