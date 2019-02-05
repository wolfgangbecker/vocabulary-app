import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import List from '@/components/List'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('List.vue', () => {
  let actions
  let store
  let wrapper

  beforeEach(() => {
    actions = {
      fetchWords: jest.fn(),
      addWord: jest.fn(),
      removeWord: jest.fn()
    }

    store = new Vuex.Store({
      state: {
        list: {
          words: []
        }
      },
      actions
    })

    wrapper = shallowMount(List, {
      store,
      localVue,
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
  })

  const sharedExamples = () => {
    it('should add a new word to the table on submit', () => {
      actions.addWord.mockImplementation((action, word) => {
        store.state.list.words.push({
          native: word.native,
          foreign: word.foreign
        })
        return Promise.resolve()
      })

      const newWord = {
        native: 'newNative',
        foreign: 'newForeign'
      }

      const nativeInput = wrapper.find('#native')
      nativeInput.element.value = newWord.native
      nativeInput.trigger('input')

      const foreignInput = wrapper.find('#foreign')
      foreignInput.element.value = newWord.foreign
      foreignInput.trigger('input')
      wrapper.find('#foreign')
      foreignInput.trigger('submit')

      const firstRowText = wrapper.find('tbody tr:last-of-type').text()

      expect(firstRowText).toMatch(new RegExp(newWord.native))
      expect(firstRowText).toMatch(new RegExp(newWord.foreign))
    })

    it('should show 2 empty input fields', () => {
      expect(wrapper.findAll('input')).toHaveLength(2)
    })
  }

  describe('with no words submitted', () => {
    it('should have the test button disabled', () => {
      expect(wrapper.find('#startTest').attributes()['class']).toContain('disabled')
    })

    it('should have an empty table', () => {
      expect(wrapper.find('tbody tr').exists()).toBe(false)
    })

    sharedExamples()
  })

  describe('with words submitted', () => {
    const testWords = [{
      native: 'native1',
      foreign: 'foreign1',
      id: 1
    }, {
      native: 'native2',
      foreign: 'foreign2',
      id: 2
    }]

    beforeEach(() => {
      store.state.list.words.push(...testWords)
    })

    it('should have the test button enabled', () => {
      expect(wrapper.find('#startTest').attributes()['class']).not.toContain('disabled')
    })

    it('should have words in the table', () => {
      const tableRows = wrapper.findAll('tbody tr')

      testWords.forEach((word, index) => {
        const firstRowText = tableRows.at(index).text()

        expect(firstRowText).toMatch(new RegExp(word.native))
        expect(firstRowText).toMatch(new RegExp(word.foreign))
      })
    })

    it('should remove a word', () => {
      actions.removeWord.mockImplementation((action, index) => {
        store.state.list.words.splice(index, 1)
        return Promise.resolve()
      })
      const firstRowRemoveAction = wrapper.find('tbody tr td:last-of-type i')
      firstRowRemoveAction.trigger('click')

      const tableRows = wrapper.findAll('tbody tr')
      const firstRowText = tableRows.at(0).text()

      expect(firstRowText).toMatch(new RegExp(testWords[1].native))
      expect(firstRowText).toMatch(new RegExp(testWords[1].foreign))
      expect(tableRows.length).toBe(1)
    })

    sharedExamples()
  })
})
