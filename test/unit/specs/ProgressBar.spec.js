import { mount } from '@vue/test-utils'
import ProgressBar from '@/components/ProgressBar'

describe('ProgressBar.vue', () => {
  let vm

  beforeEach(() => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        percentage: 30
      }
    })
    vm = wrapper.vm
  })

  it('should render the progress with the correct width', () => {
    expect(vm.$el.querySelector('.bar').style.width)
      .toEqual('30%')
  })
})
