/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'Gene_BraintreeHiConversion/js/payment-method-config',
], function ($, paymentMethodConfig) {
    'use strict';

    return {

        new: function (args) {
            var obj = {
                page: args.page,
                type: args.type,
                device: args.device,
                needs: args.needs,
                canTestWallet: canTestWallet,
                config: {},
                defaultConfig: {},
                sameConfig: sameConfig,
                missing: [],
                getEnabled: getEnabled,
                setEnabled: setEnabled,
                init: init,
                elem: {
                    style: styleElem,
                    selector: args.selector,
                    buttonSelector: args.buttonSelector,
                    hide: hide,
                    show: show,
                    found: found,
                    buttonFound: buttonFound,
                },
                status: findStatus,
                test: {
                    eligible: eligible(),
                },
                desiredConfig: desiredConfig,
                extendDesiredConfig: extendDesiredConfig,
                applyDesiredConfig: applyDesiredConfig,
                extendAndApplyDesiredConfig: extendAndApplyDesiredConfig,
            }
            function getUniqId() {
                return Date.now() + Math.random().toString().slice(2);
            };
            function deregister(id) {
                var degistered = false;
                $.each(obj.listeners, function (eventType, eventTypeListeners) {
                    $.each(eventTypeListeners, function (eventId, cb) {
                        if (eventId === id) {
                            degistered = true;
                            delete obj.listeners[eventType][eventId];
                        }
                    })
                });
                return degistered
            }
            function register(type, cb) {
                var eventId = getUniqId();
                if (typeof (cb) === 'function') {
                    obj.listeners[type][eventId] = cb;
                    return eventId;
                } else {
                    return "must be a function";
                }
            }
            function onEvent(store, callback) {
                $.each(store, function (eventId, cb) {
                    cb(callback)
                });
                return obj;
            }
            function onClick(callback) {
                return onEvent(obj.listeners.click, callback);
            }
            function onCancel(callback) {
                return onEvent(obj.listeners.cancel, callback);
            }
            function onError(callback) {
                return onEvent(obj.listeners.error, callback);
            }
            function onRender(callback) {
                return onEvent(obj.listeners.render, callback);
            }
            function styleElem() {
                var elem = $('style[data-page="' + obj.page + '"][data-type="' + obj.type + '"]');
                return (elem.length === 0) ? false : elem;
            }
            function show(force) {
                var cssShow = function(){
                    var containers = $(obj.elem.selector);
                    if (containers.length !== 0){
                        $.each(containers, function(i,v){
                            var button = $(v).find('.paypal-button');
                            if (button.length > 1){
                                button[0].remove();
                            }
                        })
                    }
                    if (styleElem() !== false) {
                        styleElem().remove();
                    }
                }
                var renderId;
                var paypalButtonRendered = function(){
                    deregister(renderId);
                    cssShow();
                }
                var renderButton = function(){
                    hide();
                    update(desiredConfig().config);
                    addButton();
                    renderId = register('render', paypalButtonRendered);
                }
                if (obj.type === 'applePay' || obj.type === 'googlePay') {
                    cssShow();
                } else if (obj.type === 'paypalCredit' || obj.type === 'paypal') {
                    if (obj.page === 'checkout'){
                        if (buttonFound() === 0){
                            cssShow();
                        }else{
                            renderButton();
                        }
                    }else if (sameConfig() === true && buttonFound() !== 0){
                        cssShow();
                    } else {
                        renderButton();
                    }
                }

                return obj;
            }
            function hide() {
                if (styleElem() === false) {
                    var text = obj.elem.selector + '{display:none;}';
                    var styleSheet = document.createElement('style');
                    styleSheet.setAttribute('data-page', obj.page);
                    styleSheet.setAttribute('data-type', obj.type);
                    document.getElementsByTagName('head')[0].appendChild(styleSheet);
                    if (styleSheet.styleSheet) {
                        styleSheet.styleSheet.cssText = text;
                    } else {
                        styleSheet.appendChild(document.createTextNode(text));
                    }
                }
                return obj;
            }
            function setShowState(showState){
                if (showState){
                    show(true);
                }else{
                    hide();
                }
            }
            function update(newConfig) {
                $.extend(true, obj.config, newConfig);
                return obj
            }
            function addButton(arg) {        
                if (obj.paypalHooks !== undefined && obj.paypalHooks.length !== 0){
                    $.each(obj.paypalHooks, function(i,paypalHook){
                        paypalHook(obj.config);
                    })
                }
                return obj;
            }
            function addPaypal(config, cb) {
                obj.defaultConfig = config;
                obj.config = $.extend(true, {}, obj.defaultConfig, obj.config);
                obj.config.events = (obj.config.events === undefined) ? {} : obj.config.events;
                obj.config.events.onClick = onClick;
                obj.config.events.onCancel = onCancel;
                obj.config.events.onError = onError;
                obj.config.events.onRender = onRender;
                obj.paypalHooks.push(cb);
                if (obj.page === 'checkout'){
                    addButton()
                }
                obj.extendAndApplyDesiredConfig({});
                return obj;
            }
            function desiredConfig() {
                return window.braintreeHicApi.desiredConfig[args.page][args.type]
            }
            function extendDesiredConfig(desiredConfig) {
                var oldDesiredConfig = window.braintreeHicApi.desiredConfig[obj.page][obj.type];
                var tempConfig = $.extend(true, {}, obj.defaultConfig, oldDesiredConfig.config);
                var newDesiredConfig = {
                    show: (desiredConfig.show === undefined) ? oldDesiredConfig.show : desiredConfig.show,
                    config: (desiredConfig.config === undefined) ? tempConfig : $.extend(true, {}, tempConfig, desiredConfig.config)
                }
                return window.braintreeHicApi.desiredConfig[obj.page][obj.type] = newDesiredConfig;
            }
            function canTestWallet(){
                if (obj.test && obj.test.isTestingEnabled && getEnabled() && window.braintreeHicApi.timing.hicLate === false){
                    return true
                }else{
                    return false;
                }
            }
            function sameConfig(){
                var curConfig = $.extend(true, {}, obj.config);
                var desiredConfig = $.extend(true, {}, obj.desiredConfig().config);
                var dontCompare = ['events'];
                $.each(dontCompare, function(i,prop){
                    if (curConfig.hasOwnProperty(prop)){
                        delete curConfig[prop];
                    }
                })
                function isEqual(value, other) {
                    var type = Object.prototype.toString.call(value);
                    if (type !== Object.prototype.toString.call(other)) return false;
                    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;
                    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
                    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
                    if (valueLen !== otherLen) return false;
                    var compare = function (item1, item2) {
                        var itemType = Object.prototype.toString.call(item1);
                        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
                            if (!isEqual(item1, item2)) return false;
                        }
                        else {
                            if (itemType !== Object.prototype.toString.call(item2)) return false;
                            if (itemType === '[object Function]') {
                                if (item1.toString() !== item2.toString()) return false;
                            } else {
                                if (item1 !== item2) return false;
                            }
                        }
                    };
                    if (type === '[object Array]') {
                        for (var i = 0; i < valueLen; i++) {
                            if (compare(value[i], other[i]) === false) return false;
                        }
                    } else {
                        for (var key in value) {
                            if (value.hasOwnProperty(key)) {
                                if (compare(value[key], other[key]) === false) return false;
                            }
                        }
                    }
                    return true;
                };
                return isEqual(curConfig, desiredConfig);
            }            
            function applyDesiredConfig() {
                if(canTestWallet()){
                    setShowState(desiredConfig().show);
                }else{
                    setShowState(true);
                }
            }
            function extendAndApplyDesiredConfig(desiredConfig) {
                var newConfig = obj.extendDesiredConfig(desiredConfig);
                obj.applyDesiredConfig(newConfig);
            }
            function removeButtons(){
                $(obj.elem.buttonSelector).remove();                
            }
            function removeButton() {
                if (buttonFound()){
                    $(obj.elem.buttonSelector)[0].remove();
                    return true
                }else{
                    return false
                }
            }
            function found() {
                return $(obj.elem.selector).length;
            }
            function buttonFound() {
                return $(obj.elem.buttonSelector).length
            }
            function eligible() {
                var e = {
                    config: true,
                    test: true,
                }
                if (args.type === 'applePay') {
                    e.secure = (location.protocol === 'https:') ? true : false;
                    e.apple_device = false;
                    e.proper_device = false;
                    e.user = false;
                    if (window.ApplePaySession !== undefined) {
                        e.apple_device = true;
                        if (window.ApplePaySession.canMakePayments() === true) {
                            e.proper_device = true;
                            var merchant_id = '';
                            ApplePaySession.canMakePaymentsWithActiveCard(merchant_id).then(function (canMakePayments) {
                                e.user = canMakePayments;
                            })
                        }
                    }
                }
                return e;
            }
            function findStatus() {
                return {
                    visible: (styleElem() !== false && buttonFound() !== 0) ? false : true,
                    found: (found() === 1) ? true : false,
                };
            }
            function add_paypal_methods() {
                $.extend(true, obj, {
                    addPaypal: addPaypal,
                    elem: {
                        add: addButton,
                        remove: removeButton,
                        removeAll: removeButtons,
                    },
                    paypalHooks: [],
                    update: update,
                    listeners: {
                        click: {},
                        cancel: {},
                        error: {},
                        render: {},
                    },
                    register: register,
                    deregister: deregister,
                    onClick: onClick,
                    onCancel: onCancel,
                    onError: onError,
                    onRender: onRender
                });
            }
            function setEnabled(args, clear) {
                return obj.needs = (clear === true) ? args : $.extend(true, obj.needs, args);
            }
            function getEnabled() {
                obj.missing = [];
                $.each(obj.needs, function (i, need) {
                    if (obj.test && obj.test.config && obj.test.config[need] !== true) {
                        obj.missing.push(need);
                    }
                })
                return (obj.missing.length === 0) ? true : false;
            }
            function init() {
                if (obj.type === 'paypal' || obj.type === 'paypalCredit') {
                    add_paypal_methods();
                }

                var konfig = $.extend({}, args.configTest);
                obj.test.isTestingEnabled = konfig.isTestingEnabled;
                delete konfig.isTestingEnabled;
                obj.test.config = konfig;

                obj.extendAndApplyDesiredConfig({});

                return obj;
            }
            return obj;
        },

    }
});