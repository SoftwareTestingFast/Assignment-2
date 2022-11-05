import React from 'react'
import { mount } from 'enzyme'
import Menu from 'react-storefront/menu/Menu'
import MenuBack from 'react-storefront/menu/MenuBack'
import MenuCard from 'react-storefront/menu/MenuCard'
import MenuFooter from 'react-storefront/menu/MenuFooter'
import MenuHeader from 'react-storefront/menu/MenuHeader'
import { ListItem } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'
import { getFiberIndex } from '../methods'

describe('Menu', () => {
  let wrapper

  afterEach(() => {
    if (wrapper.exists()) {
      wrapper.unmount()
    }
  })

  it('should render custom drawer', () => {
    wrapper = mount(<Menu renderDrawer={() => <div className="foo" />} />)
    expect(wrapper.find('.foo').length).toBe(1)
  })

  it('should render footer', () => {
    wrapper = mount(
      <Menu
        root={{
          items: [{ text: 'item1', href: '/item1', as: '/item1', items: [] }],
          footer: 'hello',
        }}
      />,
    )
    expect(wrapper.find(MenuFooter).length).toBe(1)
  })

  it('should render custom footer', () => {
    wrapper = mount(
      <Menu
        root={{
          text: 'root',
          items: [{ text: 'item1', href: '/item1', as: '/item1', items: [] }],
        }}
        renderFooter={item => `${item.text} footer`}
      />,
    )
    expect(wrapper.find(MenuFooter).text()).toBe('root footer')
  })

  it('should render header', () => {
    wrapper = mount(
      <Menu
        open
        root={{
          items: [{ text: 'item1', href: '/item1', as: '/item1', items: [] }],
          header: 'hello',
        }}
      />,
    )
    expect(wrapper.find(MenuHeader).length).toBe(1)
  })

  it('should render custom header', () => {
    wrapper = mount(
      <Menu
        root={{
          text: 'root',
          items: [{ text: 'item1', href: '/item1', as: '/item1', items: [] }],
        }}
        renderHeader={item => `${item.text} header`}
      />,
    )
    expect(wrapper.find(MenuHeader).text()).toBe('root header')
  })

  it('should navigate to submenu', () => {
    wrapper = mount(
      <Menu
        root={{
          items: [{ text: 'item1', href: '/item1', as: '/item1', items: [] }],
        }}
      />,
    )
    expect(
      wrapper
        .find(MenuCard)
        .first()
        .prop('card'),
    ).toBe(0)
    wrapper
      .find('.MuiListItem-root')
      .last()
      .simulate('click')
    expect(
      wrapper
        .find(MenuCard)
        .first()
        .prop('card'),
    ).toBe(1)
    // Not sure this is actually possible for a user to do, since
    // they are clicking a hidden menu item
    wrapper
      .find('.MuiListItem-root')
      .last()
      .simulate('click')
  })

  it('should render with persistence', () => {
    wrapper = mount(
      <Menu
        persistent
        root={{
          items: [
            { text: 'item1', href: '/item1', as: '/item1', items: [] },
            { text: 'item2', href: '/item2', as: '/item2' },
            { text: 'item3', href: '/item3', as: '/item3' },
          ],
        }}
      />,
    )
    expect(wrapper.find(ListItem).length).toBe(3)
  })

  it('should update contents when root property is updated', () => {
    wrapper = mount(
      <Menu
        root={{
          items: [
            { text: 'item1', href: '/item1', as: '/item1', items: [] },
            { text: 'item2', href: '/item2', as: '/item2' },
            { text: 'item3', href: '/item3', as: '/item3' },
          ],
        }}
      />,
    )
    wrapper.setProps({
      root: {
        items: [
          { text: 'item1', href: '/item1', as: '/item1' },
          { text: 'item2', href: '/item2', as: '/item2' },
          { text: 'item3', href: '/item3', as: '/item3' },
          { text: 'item4', href: '/item4', as: '/item4' },
        ],
      },
    })
    wrapper.update()
    expect(wrapper.find(ListItem).length).toBe(4)
  })

  it('should use menu back to come back from submenu', () => {
    wrapper = mount(
      <Menu
        persistent
        root={{
          items: [{ text: 'item1', href: '/item1', as: '/item1', items: [] }],
        }}
      />,
    )
    expect(
      wrapper
        .find(MenuCard)
        .first()
        .prop('card'),
    ).toBe(0)
    wrapper
      .find('.MuiListItem-root')
      .last()
      .simulate('click')
    expect(
      wrapper
        .find(MenuCard)
        .first()
        .prop('card'),
    ).toBe(1)
    wrapper
      .find('.MuiButtonBase-root')
      .last()
      .simulate('click')
    expect(
      wrapper
        .find(MenuCard)
        .first()
        .prop('card'),
    ).toBe(0)
  })

  it('should render links within menu model', () => {
    wrapper = mount(<Menu root={{ items: [{ text: 'foo', href: '/foo', as: '/foo' }] }} />)
    expect(
      wrapper
        .find('a')
        .at(1)
        .prop('href'),
    ).toBe('/foo')
  })

  it('should render link within expanded menu', () => {
    wrapper = mount(
      <Menu
        root={{
          text: 'foo',
          items: [
            {
              text: 'foo',
              href: '/foo',
              as: '/foo',
              expanded: true,
              items: [{ text: 'bar', href: '/bar', as: '/bar' }],
            },
          ],
        }}
      />,
    )
    expect(wrapper.find(ListItem).text()).toBe('bar')
  })

  it('should render back icon with in secondary menu', () => {
    wrapper = mount(
      <Menu
        open
        root={{
          text: 'foo',
          items: [
            {
              text: 'foo',
              href: '/foo',
              as: '/foo',
              items: [
                {
                  text: 'bar',
                  href: '/bar',
                  as: '/bar',
                  items: [
                    {
                      text: 'foo3',
                      href: '/foo3',
                      as: '/foo3',
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />,
    )
    wrapper
      .find('.MuiListItem-root')
      .last()
      .simulate('click')
    expect(wrapper.find(ChevronLeft).length).toBe(1)
  })

  it('should render custom text for back button in secondary menu', () => {
    wrapper = mount(
      <Menu
        open
        renderBack={() => 'Back'}
        root={{
          text: 'foo',
          items: [
            {
              text: 'foo',
              href: '/foo',
              as: '/foo',
              items: [
                {
                  text: 'bar',
                  href: '/bar',
                  as: '/bar',
                  items: [
                    {
                      text: 'foo3',
                      href: '/foo3',
                      as: '/foo3',
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />,
    )
    wrapper
      .find('.MuiListItem-root')
      .last()
      .simulate('click')
    expect(wrapper.find(MenuBack).text()).toBe('Back')
  })
})
