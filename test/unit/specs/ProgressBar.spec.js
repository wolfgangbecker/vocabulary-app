import Vue from 'vue'
import { shallow, createLocalVue, mount } from '@vue/test-utils'
import ProgressBar from '@/components/ProgressBar'

const localVue = createLocalVue()

describe('ProgressBar.vue', () => {
  let vm
  let wrapper

  beforeEach(() => {
    wrapper = mount(ProgressBar, {
      propsData: {
        percentage: 30
      }
    })
    vm = wrapper.vm
  })

  it('should render the progress with the correct width', () => {
    expect(vm.$el.querySelector('.progress').style.width)
      .toEqual('30%')
  })
})
