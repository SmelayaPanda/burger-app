import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()})

describe('<NavigationsItems />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<NavigationItems isAuth={false}/>)
  })

  it('should render two <NavigationsItems /> if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })

  it('should render three <NavigationsItems /> if authenticated', () => {
    wrapper.setProps({isAuth: true})
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  })

  it('should render Logout', () => {
    wrapper.setProps({isAuth: true})
    expect(wrapper.contains(
      <NavigationItem link={'/logout'}>Logout</NavigationItem>)
    ).toEqual(true)
  })
})