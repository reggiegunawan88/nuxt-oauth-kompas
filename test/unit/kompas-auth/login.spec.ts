import Vuex from 'vuex'
import { mount, createLocalVue } from "@vue/test-utils";
import loginHome from '@/pages/login/index.vue'

const localVue = createLocalVue();
localVue.use(Vuex);
// const store = new Vuex.Store({})

describe('Login.vue', () => {
  test('snapshot ', () => {
    const $store = {
      state: {
        passwordChanged: false,
      }
    }
    const wrapper = mount(loginHome, {
      mocks: {
        $store,
      }
    })
    expect(wrapper).toMatchSnapshot()
  });
});