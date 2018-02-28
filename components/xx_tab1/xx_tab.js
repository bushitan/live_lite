// components/xx_tab/xx_tab.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        list: {
            type: Array,
            value: [],
            //   observer: '_changeLevel',
        },
        key: {
            type: String,
            value: "",
        },
        unselectcolor: {
            type: String,
            value: "",
        },
        selectcolor: {
            type: String,
            value: "",
        },
  },

  /**
   * 组件的初始数据
   */
  data: {

      selectIndex:0,
  },
  /**
   * 组件的方法列表
   */
  methods: {
      click(e){
          var _index = e.currentTarget.dataset.index
          this.setData({
              selectIndex:_index
          })
          this.triggerEvent('click', this.data.list[this.data.selectIndex]);
      },
  }
})
