import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()})

describe('<NavigationsItems />', () => {
  it('should render two <NavigationsItems /> if not authenticated', () => {
    const wrapper = shallow(<NavigationItems isAuth={false}/>)
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })
})