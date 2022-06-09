// components/classic/music/music.js
import {
  classicBehavior
} from '../classic-beh.js'

let mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],

  properties: {
    src: String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    waittingUrl: 'images/player@waitting.png',
    playingUrl: 'images/player@playing.png'
  },

  attached: function() {
    this._recoverPlaying()
    this._monitorSwitch()
  },

  detached: function() {
    // mMgr.stop()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      if (!this.data.playing) {
        this.setData({
          playing: true,
        })
        // 只会在暂停后继续播放执行
        if(mMgr.src == this.properties.src){
          mMgr.play()
        }
        // 只会在第一次播放后执行
        else{
          mMgr.src = this.properties.src
        }
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false,
        })
        mMgr.pause()
      }
    },
    // 在播放时切换后台或者别的页面，切换回来的时候保证按钮和图片是播放状态
    _recoverPlaying: function() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      // 切换回页面 如果判断是否正在播放，如没有播放则保持暂停
      if (mMgr.src == this.properties.src) {
        if (!mMgr.paused) {
          this.setData({
            playing: true
          })
        }
      }
    },

    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverPlaying()
      })
      mMgr.onPause(() => {
        this._recoverPlaying()
      })
      mMgr.onStop(() => {
        this._recoverPlaying()
      }),
      mMgr.onEnded(()=>{
        this._recoverPlaying()
      })
    }

  }
})