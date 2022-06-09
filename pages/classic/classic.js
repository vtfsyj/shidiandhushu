// pages/classic/classic.js
import {
    ClassicModel
} from '../../models/classic.js'
import {
    LikeModel
} from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        classic: null,
        // 获取下一期期刊，true证明是最新（最后）一期
        latest: true,
        // 获取上一期期刊
        first: false,
        like: false,
        count: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        classicModel.getLatest((data) => {
            // this._getLikeStatus(data.id, data.type)
            this.setData({
                classic: data
            })
        })
    },

    onLike: function (event) {
        let like_or_cancel = event.detail.behavior
        likeModel.like(like_or_cancel, this.data.classic.id, this.data.classic.type)
    },

    onPreviousNext: function (event) {
        let index = this.data.classic.index
        classicModel.getClassic(index, event.detail.bev, (data) => {
            if (data) {
                // this._getLikeStatus(data.id, data.type)
                this.setData({
                    classic: data,
                    latest: classicModel.isLatest(data.index),
                    first: classicModel.isFirst(data.index)
                })
            } else {
                console.log('not more classic')
            }
        })
    },
    _getLikeStatus: function (cid, type) {
        likeModel.like(cid, type, (data) => {
            this.setData({
                like: data.like_status,
                count: data.fav_nums
            })
        })
    }

})