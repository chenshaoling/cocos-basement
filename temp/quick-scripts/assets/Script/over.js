(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/over.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c4fe2cgQaxLbYVl68pB8Bv4', 'over', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=over.js.map
        