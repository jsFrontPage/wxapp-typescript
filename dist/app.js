"use strict";
// fix rxjs
global.global = global;
global.Object = Object;
global.clearTimeout = clearTimeout;
var Promise = require("./libs/bluebird");
var Rx = require("./libs/@reactivex/rxjs");
Rx.Observable
    .of('hello world')
    .subscribe(function (x) { return console.log(x); });
var Application = (function () {
    function Application() {
        this.globalData = {
            userInfo: null,
        };
    }
    Application.prototype.onLaunch = function () {
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
    };
    Application.prototype.getUserInfo = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.globalData.userInfo) {
                resolve(_this.globalData.userInfo);
            }
            else {
                wx.login({
                    success: function () {
                        wx.getUserInfo({
                            success: function (_a) {
                                var userInfo = _a.userInfo;
                                _this.globalData.userInfo = userInfo;
                                resolve(userInfo);
                            },
                        });
                    },
                });
            }
        });
    };
    return Application;
}());
App(new Application());
