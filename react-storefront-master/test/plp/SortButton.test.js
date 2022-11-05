import React from 'react'
import { mount } from 'enzyme'
import { windowLocationMock } from '../mocks/mockHelper'
import SearchResultsContext from 'react-storefront/plp/SearchResultsContext'
import Drawer from 'react-storefront/drawer/Drawer'
import { Menu } from '@mui/material'
import Sort from 'react-storefront/plp/Sort'
import SortButton from 'react-storefront/plp/SortButton'
import { act } from 'react-dom/test-utils'
import useMediaQuery from '@mui/material/useMediaQuery'

jest.mock('@mui/material/useMediaQuery')

describe('SortButton', () => {
  const sortOptions = [
    { name: 'Price - Lowest', code: 'price_asc' },
    { name: 'Price - Highest', code: 'price_desc' },
    { name: 'Most Popular', code: 'pop' },
    { name: 'Highest Rated', code: 'rating' },
  ]

  let wrapper,
    title,
    selectedSort = '',
    drawerProps,
    sortProps,
    onClickHandler

  afterEach(() => {
    wrapper.unmount()
    title = undefined
    selectedSort = ''
    drawerProps = undefined
    sortProps = undefined
    onClickHandler = undefined
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  const Test = () => (
    <SearchResultsContext.Provider
      value={{
        pageData: { sort: selectedSort, sortOptions: sortOptions },
        actions: { setSort: jest.fn() },
      }}
    >
      <SortButton
        title={title}
        drawerProps={{ testprops: drawerProps }}
        sortProps={{ testprops: sortProps }}
        onClick={onClickHandler}
      />
    </SearchResultsContext.Provider>
  )

  it('should show sort as a drawer when mediaQuery returns true', () => {
    useMediaQuery.mockReturnValue(true)

    wrapper = mount(<Test />)

    expect(wrapper.find(Drawer)).toExist()
    expect(wrapper.find(Menu)).not.toExist()
  })

  it('should show sort as a menu when mediaQuery returns false', () => {
    useMediaQuery.mockReturnValue(false)

    wrapper = mount(<Test />)

    expect(wrapper.find(Drawer)).not.toExist()
    expect(wrapper.find(Menu)).toExist()
  })

  it('should open drawer and mount Sort component on button click', () => {
    useMediaQuery.mockReturnValue(true)
    title = 'drawerTest'

    wrapper = mount(<Test />)
    expect(wrapper.find(Sort)).not.toExist()

    wrapper.find('.MuiButton-root').last().simulate('click')

    expect(wrapper.find(Sort)).toExist()
    expect(wrapper.find(Drawer).prop('open')).toBe(true)
  })

  it('should pass drawerProps and title to drawer and sortProps to Sort', () => {
    useMediaQuery.mockReturnValue(true)
    title = 'drawerTestTitle'
    drawerProps = 'drawerTestProps'
    sortProps = 'sortTestProps'

    wrapper = mount(<Test />)
    wrapper.find('.MuiButton-root').last().simulate('click')

    expect(wrapper.find(Drawer).prop('title')).toBe(title)
    expect(wrapper.find(Drawer).prop('testprops')).toBe(drawerProps)
    expect(wrapper.find(Sort).prop('testprops')).toBe(sortProps)
  })

  it('should pass sortProps to Sort when SortButton is used as Menu', () => {
    useMediaQuery.mockReturnValue(false)
    sortProps = 'sortTestProps'

    wrapper = mount(<Test />)

    wrapper.find('.MuiButton-root').last().simulate('click')

    expect(wrapper.find(Menu)).toExist()
    expect(wrapper.find(Sort).prop('testprops')).toBe(sortProps)
  })

  it('should trigger custom onClick function when passed as prop', () => {
    useMediaQuery.mockReturnValue(true)
    onClickHandler = jest.fn()

    wrapper = mount(<Test />)

    expect(onClickHandler).toHaveBeenCalledTimes(0)
    wrapper.find('.MuiButton-root').last().simulate('click')
    expect(onClickHandler).toHaveBeenCalledTimes(1)
  })

  it('should not open Sort when defaultPrevented', () => {
    useMediaQuery.mockReturnValue(true)
    onClickHandler = e => e.preventDefault()

    wrapper = mount(<Test />)

    expect(wrapper.find(Drawer).prop('open')).toBe(false)
    wrapper.find('.MuiButton-root').last().simulate('click')
    expect(wrapper.find(Drawer).prop('open')).toBe(false)
  })

  it('should close Drawer', async () => {
    useMediaQuery.mockReturnValue(true)

    wrapper = mount(<Test />)

    wrapper.find('.MuiButton-root').last().simulate('click')
    expect(wrapper.find(Drawer).prop('open')).toBe(true)

    wrapper.find(Drawer).invoke('onClose')()

    expect(wrapper.find(Drawer).prop('open')).toBe(false)
  })

  it('should close Menu', async () => {
    useMediaQuery.mockReturnValue(false)

    wrapper = mount(<Test />)

    wrapper.find('.MuiButton-root').last().simulate('click')
    expect(wrapper.find(Menu).prop('open')).toBe(true)

    await act(async () => {
      await wrapper.find(Menu).invoke('onClose')()
      await wrapper.update()
    })

    expect(wrapper.find(Menu).prop('open')).toBe(false)
  })

  it('should show selected sort name', async () => {
    selectedSort = 'rating'
    useMediaQuery.mockReturnValue(false)

    wrapper = mount(<Test />)

    expect(wrapper.find('.RSFActionButton-value').last().text()).toBe('Highest Rated')
  })

  it('should open sort if location have openSort', async () => {
    useMediaQuery.mockReturnValue(true)
    windowLocationMock('/', '?openSort=1')

    wrapper = mount(<Test />)

    expect(wrapper.find(Drawer).prop('open')).toBe(true)
  })
})
