import { shallow, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import List from '@/components/List'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('List.vue', () => {
  let actions
  let store
  let wrapper

  describe('with no words submitted', () => {
    beforeEach(() => {
      actions = {
        fetchWords: jest.fn(),
        addWord: jest.fn(),
        removeWord: jest.fn()
      }
      store = new Vuex.Store({
        state: {
          words: []
        },
        actions
      })

      wrapper = shallow(List, {
        store,
        localVue,
        stubs: {
          RouterLink: RouterLinkStub
        }
      })
    })

    it('should show 2 empty input fields', () => {
      expect(wrapper.findAll('input')).toHaveLength(2)
    })

    it('should have the test button disabled', () => {
      expect(wrapper.find('#startTest').attributes()['disabled']).toBe('disabled')
    })

    it('should have an empty table', () => {
      expect(wrapper.find('tbody tr').exists()).toBe(false)
    })
  })
})
