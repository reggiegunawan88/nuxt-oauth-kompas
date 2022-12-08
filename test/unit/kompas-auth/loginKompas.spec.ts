import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import loginKompas from '@/components/kompas-auth/loginKompas/index.vue'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('Login Komponen', () => {
  const loginMock = jest.fn(() => Promise.resolve())
  // mock vuex store
  const store = new Vuex.Store({
    actions: {
      login: loginMock,
    },
    state: {
      warningIndicator: 0,
    },
  })

  const wrapper = mount(loginKompas, {
    localVue,
    store,
    stubs: { nuxtLink: true, FontAwesomeIcon: true },
    mocks: {
      $auth: {
        $storage: {
          getLocalStorage: () => jest.fn()
        }
      },
      $store: {
        state: {
          warningIndicator: 0
        }
      }
    },
  })

  test('test snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  // it('merender email & password input field', () => {
  //   const emailInput = wrapper.find('#email')
  //   const passwordInput = wrapper.find('#password')
  //   expect(emailInput.exists()).toBe(true)
  //   expect(passwordInput.exists()).toBe(true)
  // })

  // it('Input berfungsi', () => {
  //   const email = 'tes@tes.com'
  //   const password = 'ehehhe'
  //   const emailInput = wrapper.find('#email')
  //   const passwordInput = wrapper.find('#password')
  //   emailInput.setValue(email)
  //   passwordInput.setValue(password)
  //   expect(wrapper.vm.$data.email).toBe(email)
  //   expect(wrapper.vm.$data.password).toBe(password)
  // })
  // it('Validasi berfungsi ketika email dan password tidak diisi', () => {
  //   const email = ''
  //   const password = ''
  //   const emailInput = wrapper.find('#email')
  //   const passwordInput = wrapper.find('#password')
  //   const buttonMasuk = wrapper.find('#masuk')
  //   emailInput.setValue(email)
  //   passwordInput.setValue(password)
  //   buttonMasuk.trigger('click')
  //   expect(wrapper.vm.$data.isEmailEmpty).toBe(true)
  //   expect(wrapper.vm.$data.isPasswordEmpty).toBe(true)
  // })
  // it('Validasi berfungsi ketika email tidak diisi', () => {
  //   const email = ''
  //   const emailInput = wrapper.find('#email')
  //   const buttonMasuk = wrapper.find('#masuk')
  //   emailInput.setValue(email)
  //   buttonMasuk.trigger('click')
  //   expect(wrapper.vm.$data.isEmailEmpty).toBe(true)
  // })
  // it('Validasi berfungsi ketika format email salah', () => {
  //   const email = 'sayaganteng.com'
  //   const password = 'hehe123'
  //   const emailInput = wrapper.find('#email')
  //   const passwordInput = wrapper.find('#password')
  //   const buttonMasuk = wrapper.find('#masuk')
  //   emailInput.setValue(email)
  //   passwordInput.setValue(password)
  //   buttonMasuk.trigger('click')
  //   expect(wrapper.vm.$data.incorrectEmail).toBe(true)
  // })
  // it('Validasi berfungsi ketika password tidak diisi', () => {
  //   const password = ''
  //   const passwordInput = wrapper.find('#password')
  //   const buttonMasuk = wrapper.find('#masuk')
  //   passwordInput.setValue(password)
  //   buttonMasuk.trigger('click')
  //   expect(wrapper.vm.$data.isPasswordEmpty).toBe(true)
  // })
  // it('indikator password/email salah berfungsi', () => {
  //   const email = 'reggie@kompas.com'
  //   const password = 'sayaganteng'
  //   const emailInput = wrapper.find('#email')
  //   const passwordInput = wrapper.find('#password')
  //   const buttonMasuk = wrapper.find('#masuk')
  //   emailInput.setValue(email)
  //   passwordInput.setValue(password)
  //   buttonMasuk.trigger('click')
  //   expect(wrapper.vm.$data.errorEmail).toBe(true)
  // })
  // TODO: AUTH MOCK, SHOW/HIDE PASS,
  // WRONG PASSWORD AUTH, SAVE COOKIE AUTH, SUCCESS AUTH
})
