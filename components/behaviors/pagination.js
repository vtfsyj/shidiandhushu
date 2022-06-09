import {
  HTTP
} from '../../utils/http.js'

let paginationBev = Behavior({
  properties: {
   
  },
  data: {
    start: 0,
    count: 20,
    dataArray: [],
    empty:false, // 搜索不到结果的时候返回true
    ending:false  // 没有更多数据的时候返回true
  },

  methods: {
    setMoreData: function(dataArray) {
        // [] == false 成立 
      if (dataArray==false) {
        //   如果数组中为空，证明后面没有数据了 设置ending为true，停止发送请求
        this.data.ending = true
        if(this.data.dataArray==false){
          this.setData({
            empty:true
          })
        }
      }
      let temp =this.data.dataArray.concat(dataArray)
      this.data.start += this.data.count
      this.setData({
        dataArray: temp
      })
      return true
    },

    hasMore:function(){
      return !this.data.ending
    },

    getCurrentStart:function(){
      return this.data.start
    },

    initPagination:function(){
      this.data.ending = false
      this.data.start = 0
      this.data.dataArray = []
      this.setData({
        dataArray:[]
      })
    }
  }
})


export {
  paginationBev
}