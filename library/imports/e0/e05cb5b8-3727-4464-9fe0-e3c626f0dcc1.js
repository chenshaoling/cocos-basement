"use strict";
cc._RF.push(module, 'e05cbW4NydEZJ/g48Ym8NzB', 'main');
// Script/main.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        wallWidth: 80,
        dici: {
            default: null,
            type: cc.Prefab
        },
        diciCount: 0,
        dici_duration: 140, //地刺距离地面对距离
        bgAudio: {
            default: null,
            url: cc.AudioClip
        },
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        },
        playTime: 60, //游戏时间，倒计时
        timeLabe: {
            default: null,
            type: cc.Label
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        },
        score: 0
    },
    moveLeft: function moveLeft() {
        var goleft = cc.moveTo(0.2, cc.p(-this.node.width / 2 + this.wallWidth, this.player.getPositionY()));
        var goL1 = cc.moveTo(0.1, cc.p(-this.node.width / 2 + this.wallWidth + 30, this.player.getPositionY()));
        var goL2 = cc.moveTo(0.1, cc.p(-this.node.width / 2 + this.wallWidth, this.player.getPositionY()));
        var sque = cc.sequence(goL1, goL2);
        if (this.player.rotationY === 0) {
            this.player.runAction(sque);
        } else {

            this.player.runAction(goleft);
        }
        this.player.rotationY = 0;
    },
    moveRight: function moveRight() {

        var goright = cc.moveTo(0.2, cc.p(this.node.width / 2 - this.wallWidth, this.player.getPositionY()));
        var goR1 = cc.moveTo(0.1, cc.p(this.node.width / 2 - this.wallWidth - 30, this.player.getPositionY()));
        var goR2 = cc.moveTo(0.1, cc.p(this.node.width / 2 - this.wallWidth, this.player.getPositionY()));
        var sque = cc.sequence(goR1, goR2);
        if (this.player.rotationY === 180) {
            this.player.runAction(sque);
        } else {
            this.player.runAction(goright);
        }
        this.player.rotationY = 180;
    },
    NewDici: function NewDici() {
        this.diciCount++;
        var newDici = cc.instantiate(this.dici);
        this.node.addChild(newDici);
        var randD = cc.random0To1();
        if (randD >= 0.5) {
            newDici.rotationY = 0;
        } else {
            newDici.rotationY = 180;
        }
        newDici.setPosition(this.diciPosition(randD));
    },
    diciPosition: function diciPosition(randD) {
        var randX = 0;
        var randY = 0;
        if (randD >= 0.5) {
            randX = this.node.width / 2 - this.wallWidth;
        } else {
            randX = -this.node.width / 2 + this.wallWidth;
        }
        if (this.diciCount <= 8) {
            randY = this.node.height / 2 - this.dici_duration * this.diciCount - this.dici_duration * 1;
        } else {
            randY = this.node.height / 2 - this.dici_duration * 8 - this.dici_duration * 1;
        }

        return cc.p(randX, randY);
    },

    // LIFE-CYCLE CALLBACKS:
    // 监听玩家输入
    setInputControl: function setInputControl() {
        var _this = this;

        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function onTouchBegan(touches, event) {
                cc.audioEngine.playEffect(_this.jumpAudio, false);
                var target = event.getCurrentTarget(); //获取事件所绑定的target
                var locationInNode = target.convertToNodeSpace(touches.getLocation()); //获取坐标信息

                if (locationInNode.x > _this.node.width / 2) {
                    _this.moveRight();
                } else {
                    _this.moveLeft();
                }
                //把分数存储到本地
                _this.score += 1;
                cc.sys.localStorage.setItem("score", _this.score);

                _this.scoreLabel.string = _this.score;
                _this.NewDici();
                return true; //这里必须要写 return true
            }
        };
        cc.eventManager.addListener(listener, this.node);
    },
    onLoad: function onLoad() {
        this.score = 0;
        //设置音效的音量
        cc.audioEngine.setEffectsVolume(0.2);
        cc.audioEngine.playMusic(this.bgAudio, true);
        this.setInputControl();
        cc.director.preloadScene("gameoverScene");
        this.player.setPosition(-this.node.width / 2 + 80, this.node.height / 2 - 175);
        for (var i = 0; i < 8; i++) {
            this.NewDici();
        }
        this.schedule(function () {
            this.playTime--;
            this.timeLabe.string = "倒计时:" + this.playTime;
            if (this.playTime <= 0) {
                cc.audioEngine.pauseMusic();
                cc.director.loadScene('OverScene');
            }
        }, 1);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();