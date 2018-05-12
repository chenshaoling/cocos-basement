"use strict";
cc._RF.push(module, 'c4fe2cgQaxLbYVl68pB8Bv4', 'over');
// Script/over.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            default: null,
            type: cc.Label
        },
        button: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var score = cc.sys.localStorage.getItem("score");
        cc.log(score);
        this.scoreLabel.string = "最终得分：" + score;
        this.button.on("touchstart", function () {
            cc.director.loadScene("mainScene");
        });
    }

    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {

    // },
});

cc._RF.pop();