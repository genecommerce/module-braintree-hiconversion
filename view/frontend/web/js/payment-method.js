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

        new: function(args){
            var obj = {
                page: args.page,
                type: args.type,
                device: args.device,
                needs: args.needs,
                config: {},
                defaultConfig: {},
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
                testing: false,
                test: {
                    eligible: eligible(),
                },
                desiredConfig: desiredConfig,
                extendDesiredConfig: extendDesiredConfig,
                applyDesiredConfig: applyDesiredConfig,
                extendAndApplyDesiredConfig: extendAndApplyDesiredConfig,
            }            
            function postMessage(args){
                var loc = document.location || window.location;
                var origin = loc.origin || loc.protocol + "//" + loc.host;
                var baseConfig = {
                    group: 'update-bt-ge-hi',
                    cat: 'paymentMethod',                    
                    page: obj.page,
                    type: obj.type,
                    device: obj.device,
                };
                var config = $.extend({}, baseConfig, args);
                window.postMessage({config}, origin);
            }
            function register(type, cb){
                return (typeof(cb) === 'function') ? obj.listeners[type].push(cb) : 'must be function';
            }
            function registerClick(cb){
                return register('click', cb);
            }
            function registerCancel(cb){
                return register('cancel', cb);
            }
            function registerError(cb){
                return register('error', cb);
            }
            function registerRender(cb){
                return register('render', cb);
            }
            function onEvent(store, callback){
                $.each(store, function(i, cb){
                    cb(callback)
                });
                return obj;
            }
            function onClick(callback){
                return onEvent(obj.listeners.click, callback);
            }
            function onCancel(callback){
                return onEvent(obj.listeners.cancel, callback);
            }
            function onError(callback){
                return onEvent(obj.listeners.error, callback);    
            }
            function onRender(callback){
                return onEvent(obj.listeners.render, callback);
            }
            function styleElem(){
                var elem = $('style[data-page="'+obj.page+'"][data-type="'+obj.type+'"]');
                return (elem.length === 0) ? false : elem;
            }
            function show(force){                
                if (styleElem() !== false){
                    if (obj.testing !== false || force === true){
                        styleElem().remove();
                    }
                }
                postMessage({
                    m: 'show',
                    testing: obj.testing,
                    force: force
                })
                return obj;
            }
            function hide(){
                if (styleElem() === false){
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
                postMessage({
                    m: 'paymentMethod.hide',
                })
                return obj;
            }
            function update(newConfig){
                $.extend(true, obj.config, newConfig);
                postMessage({
                    m: 'paymentMethod.update',                    
                })
                return obj
            }
            function addButton(arg){
                if (arg !== false){
                    removeButton();
                }
                if (obj.paypalHook !== undefined && typeof(obj.paypalHook) === 'function'){
                    obj.paypalHook(obj.config);
                }
                postMessage({
                    m: 'paymentMethod.addButton',                                                        
                });
                return obj;
            }
            function addPaypal(config, cb){
                obj.defaultConfig = config;
                obj.config = $.extend(true, {}, obj.defaultConfig, obj.config);
                obj.config.events = (obj.config.events === undefined) ? {} : obj.config.events;
                obj.config.events.onClick = onClick;
                obj.config.events.onCancel = onCancel;
                obj.config.events.onError = onError;
                obj.config.events.onRender = onRender;
                obj.paypalHook = cb;
                obj.extendAndApplyDesiredConfig({});
                postMessage({
                    m: 'paymentMethod.addPaypal',
                })
                return obj;
            }
            function desiredConfig(){
                return window.braintreeHicApi.desiredConfig[args.page][args.type]
            }
            function extendDesiredConfig(desiredConfig){
               var oldDesiredConfig = window.braintreeHicApi.desiredConfig[obj.page][obj.type];               
               var tempConfig = $.extend(true, {}, obj.defaultConfig, oldDesiredConfig.config);
               var newDesiredConfig = {
                   show: (desiredConfig.show === undefined) ? oldDesiredConfig.show : desiredConfig.show,
                   config: (desiredConfig.config === undefined) ? tempConfig : $.extend(true, {}, tempConfig, desiredConfig.config)
               }
               return window.braintreeHicApi.desiredConfig[obj.page][obj.type] = newDesiredConfig;
            }
            function applyDesiredConfig(){
                var isPaypal = (obj.type === 'paypalCredit' || obj.type === 'paypalCheckout') ? true : false;
                var desiredConfig = obj.desiredConfig();
                if (obj.test && obj.test.isTestingEnabled && getEnabled() && window.braintreeHicApi.timing.hicLate === false){
                    if (isPaypal){
                        update(desiredConfig.config);
                        addButton();
                    }
                    if (desiredConfig.show){
                        show(true)
                    }else{
                        hide();
                    }
                }else{
                    if (isPaypal){
                        addButton();
                    }
                    show(true);
                }
            }
            function extendAndApplyDesiredConfig(desiredConfig){
                var newConfig = obj.extendDesiredConfig(desiredConfig);
                obj.applyDesiredConfig(newConfig);
            }
            function removeButton(){
                $(obj.elem.buttonSelector).remove();
                postMessage({
                    m: 'paymentMethod.removeButton',
                })
                return obj;
            }
            function found(){
                return $(obj.elem.selector).length;
            }
            function buttonFound(){
                return $(obj.elem.buttonSelector).length
            }
            function eligible(){
                var e = {
                    config: true,
                    test: true,
                }
                if (args.type === 'applePay'){
                    e.secure = (location.protocol === 'https:') ? true : false;
                    e.apple_device = false;
                    e.proper_device = false;
                    e.user = false;  
                    if (window.ApplePaySession !== undefined){
                        e.apple_device = true;
                        if (window.ApplePaySession.canMakePayments() === true){
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
            function findStatus(){
                return {
                    visible: (styleElem() !== false && buttonFound() !== 0) ? false : true,
                    found: (found() === 1) ? true : false,
                    enableShow: (obj.testing === false) ? false : true,
                };
            }
            function add_paypal_methods(){
                $.extend(true, obj, {
                    addPaypal: addPaypal,
                    elem: {
                        add: addButton,
                        remove: removeButton,
                    },
                    paypalHook: false,
                    update: update,
                    listeners: {
                        click: [],
                        cancel: [],
                        error: [],
                        render: [],
                    },
                    register: register, 
                    registerClick: registerClick,
                    registerCancel: registerCancel,
                    registerError: registerError,
                    registerRender: registerRender,
                    onClick: onClick,
                    onCancel: onCancel,
                    onError: onError,
                    onRender: onRender
                });
            }            
            function setEnabled(args, clear){
                return obj.needs = (clear === true) ? args : $.extend(true, obj.needs, args);
            }
            function getEnabled(){
                obj.missing = [];
                $.each(obj.needs, function(i,need){
                    if (obj.test && obj.test.config && obj.test.config[need] !== true){
                        obj.missing.push(need);
                    }
                })
                return (obj.missing.length === 0) ? true : false;
            }
            function init(){
                if (obj.type === 'paypalCheckout' || obj.type === 'paypalCredit'){
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