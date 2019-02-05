import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Test from '@/components/Test'
import ProgressBar from '@/components/ProgressBar'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Test.vue', () => {
  let actions
  let getters
  let store
  let wrapper
  let router
  const currentWord = { native: 'native' }

  beforeEach(() => {
    actions = {
      newTest: jest.fn(),
      submitGuess: jest.fn()
    }

    getters = {
      testIsFinished: jest.fn(),
      currentTestWord: jest.fn()
        .mockReturnValue(currentWord),
      testProgress: jest.fn()
    }

    store = new Vuex.Store({
      state: {},
      actions,
      getters
    })

    router = new VueRouter()
    router.push = jest.fn()

    wrapper = shallowMount(Test, {
      store,
      router,
      localVue,
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
  })

  it('should have an empty input field', () => {
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('should have a progress bar', () => {
    expect(wrapper.find(ProgressBar).exists()).toBe(true)
  })

  it('should dispatch a newTest action to start the test', () => {
    expect(actions.newTest).toBeCalled()
  })

  it('should show the current word to guess', () => {
    expect(wrapper.find('#currentWord').text()).toBe(currentWord.native)
  })

  describe('submit', () => {
    let inputField
    const guess = 'foreign'

    beforeEach(() => {
      inputField = wrapper.find('input')
      inputField.element.value = guess
      inputField.trigger('input')
    })

    it('should dispatch a submitGuess action with the provided guess', () => {
      getters.testIsFinished.mockReturnValue(false)
      inputField.trigger('submit')

      expect(actions.submitGuess.mock.calls[0]).toContain(guess)
    })

    it('should clear the input field on submit', () => {
      getters.testIsFinished.mockReturnValue(false)
      inputField.trigger('submit')

      expect(inputField.element.value).toBe('')
    })

    it('should navigate to the results path when the test is finished', () => {
      getters.testIsFinished.mockReturnValue(true)
      inputField.trigger('submit')

      expect(router.push).toBeCalledWith('results')
    })
  })
})
