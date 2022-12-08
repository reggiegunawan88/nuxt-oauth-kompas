import { shallowMount } from "@vue/test-utils";
import Header from '~/components/header/header.vue'
describe('Header.vue test', () => {
  // mock route
  const $route = {
    query: {
      prevurl: '/'
    }
  }
  const wrapper = shallowMount(Header, {
    stubs: { fontAwesomeIcon: true },
    mocks: {
      $route,
    }
  })
  test('snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });

  test('header back button', () => {
    const button = wrapper.find('#btnBack')
    const fontawesomeicon = wrapper.find('#btnIcon')
    const textBtn = wrapper.find("#txtKembali")
    expect(button).toBeTruthy()
    expect(fontawesomeicon).toBeTruthy()
    expect(textBtn).toBeTruthy()
  });
  test('render image logo', () => {
    const img = wrapper.findAll('#logoKompas')
    expect(img.length).toBe(2)
  });
});