"use strict";
cc._RF.push(module, '50a1fwO97pJHbvKuHp1WNh3', 'player');
// Script/player.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {},
    noteBox: function noteBox() {
        return this.node.getBoundingBox();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();