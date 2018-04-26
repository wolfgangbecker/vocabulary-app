import { shallow, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import Results from '@/components/Results'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Results.vue', () => {
  let getters
  let store
  let wrapper
  let currentTestWords = [{
    native: 'native1',
    foreign: 'foreign1',
    guess: 'guess1',
    success: false
  }, {
    native: 'native2',
    foreign: 'foreign2',
    guess: 'foreign2',
    success: true
  }]
  const score = 100

  beforeEach(() => {
    getters = {
      score: jest.fn().mockReturnValue(score)
    }

    store = new Vuex.Store({
      state: {
        test: {
          currentTestWords: currentTestWords
        }
      },
      getters
    })

    wrapper = shallow(Results, {
      store,
      localVue,
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
  })

  it('should show the score', () => {
    expect(wrapper.find('#score').text()).toEqual(`${score}%`)
  })

  it('should show the results in a table', () => {
    const tableRows = wrapper.findAll('tbody tr')

    currentTestWords.forEach((word, index) => {
      const rowText = tableRows.at(index).text()

      expect(rowText).toMatch(new RegExp(word.native))
      expect(rowText).toMatch(new RegExp(word.foreign))
      expect(rowText).toMatch(new RegExp(word.guess))
    })
  })

  it('should set a succees class on table rows with successful guesses', () => {
    const successTableRow = wrapper.find('tbody tr:last-of-type')

    expect(successTableRow.attributes().class).toContain('positive')
    expect(successTableRow.attributes().class).not.toContain('negative')
  })

  it('should not set a succees class on table rows with failed guesses', () => {
    const successTableRow = wrapper.find('tbody tr')

    expect(successTableRow.attributes().class).toContain('negative')
    expect(successTableRow.attributes().class).not.toContain('positive')
  })
})
