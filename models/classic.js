import {
    HTTP
} from '../utils/http.js'

class ClassicModel extends HTTP {
    /* 获得最新期刊 */
    getLatest(sCallback) {
        // console.log(sCallback)
        this.request({
            url: 'classic/latest',
            success: (res) => {
                // 如果不用箭头函数，this将指代不正确
                sCallback(res)
                this._setLatestIndex(res.index)
                // 缓存到本地
                let key = this._getKey(res.index)
                wx.setStorageSync(key, res)
            }
        })
    }
    // 获得期刊序号
    _getKey(index) {
        const key = 'classic-' + index
        return key
    }
    /*获得期刊*/
    getClassic(index, nextOrPrevious, sCallback) {
        //从缓存中取得数据 然后再存入缓存
        //key 确定可KEY
        let key = nextOrPrevious == 'next' ?
            this._getKey(index + 1) : this._getKey(index - 1)
        let classic = wx.getStorageSync(key)
        // 判断是否有缓存，有则读取本地，没有则请求接口
        if (!classic) {
            this.request({
                url: `classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    wx.setStorageSync(
                        this._getKey(res.index), res)
                    sCallback(res)
                }
            })
        } else {
            sCallback(classic)
        }

    }
    /*是否为第一期*/
    isFirst(index) {
        return index == 1 ? true : false
    }
    /*是否为最后一期*/
    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false
    }
    /*设置最后一期*/
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }
    /*得到最后一期*/
    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index
    }
}
export {
    ClassicModel
}