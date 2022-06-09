// components/like/like.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        like: Boolean,
        count: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        yes_url: 'images/like.png',
        no_url: 'images/like@dis.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //onLike方法是实现点击切换喜欢不喜欢，以及count加减
        onLike: function (event) {
            var like = this.properties.like;
            var count = this.properties.count;
            //like默认值false
            count = like ? count - 1 : count + 1;
            this.setData({
                count: count,
                like: !this.properties.like
            })

            //激活点赞状态，自定义函数
            let behavior = this.properties.like ? 'like' : 'cancel';
            //监听一个事件
            this.triggerEvent('like', {
                behavior: behavior
            }, {})

        }
    }
})