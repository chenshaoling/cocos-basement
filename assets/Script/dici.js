// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var tmpPlayer = require("player");
cc.Class({
    extends: cc.Component,

    properties: {
        dieAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    setInputControl: function() {
        var self = this;
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(thouches, evnet) {
                var goAction = cc.moveBy(0.2, cc.p(0, 140));
                self.node.runAction(goAction);
                return true;
            },
        }
        cc.eventManager.addListener(listener, self.node);
    },

    onLoad: function() {
        this.setInputControl();
    },
    noteBox: function() {
        return this.node.getBoundingBoxToWorld();
    },
    update: function(dt) {
        var player = cc.find("Canvas/normal").getComponent(tmpPlayer);

        if (cc.rectIntersectsRect(player.node.getBoundingBoxToWorld(), this.noteBox())) {

            cc.audioEngine.playEffect(this.dieAudio, false);
            cc.director.loadScene('gameoverScene');
        }

    },
    start() {

    },

    // update (dt) {},
});