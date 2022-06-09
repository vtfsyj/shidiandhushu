// 缓存搜索历史记录关键词
import {
    HTTP
} from '../../utils/http.js'
class KeywordModel extends HTTP {
    key = 'q'
    max = 10
    constructor() {
        super()
    }

    getHistory() {
        var keywords = wx.getStorageSync(this.key)
        return keywords
    }

    getHot(success) {
        this.request({
            url: 'book/hot_keyword',
            success: success
        })
    }


    addToHistory(word) {
        let keywords = this.getHistory()
        if (keywords) {
            let index = keywords.indexOf(word)
            // 搜索缓存中的历史结果数组，如果没有则添加到缓存中
            if (index == -1) {
                let length = keywords.length
                if (length >= this.max) {
                    keywords.pop(word)
                }
                keywords.unshift(word)
            // 如果有，则将该关键词提到数组最前，并且删掉旧的索引位置
            } else {
                let index = keywords.indexOf(word)
                keywords.splice(index,1)
                keywords.unshift(word)
            }
            wx.setStorageSync(this.key, keywords)
        } else {
            keywords = [word]
            wx.setStorageSync(this.key, keywords)
        }
    }
}

export {
    KeywordModel
}