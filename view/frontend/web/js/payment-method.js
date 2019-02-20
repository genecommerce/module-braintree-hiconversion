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
            var style = false;
            var obj = {
                page: args.page,
                type: args.type,
                configTest: args.configTest,
                config: {},
                config_default: {},
                eligible: eligible(),        
                selector: args.selector,
                enable: null,
                options: null,
                show: show,
                hide: hide,
                init: init,
                found: found,
                test: {                    
                    name: 'bt-hic-disable-test-' + args.page,
                    state: findState,
                    disable: disableTest,
                    enable: enableTest,
                },
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
                return onEvent(obj.listeners.click, callback);
            }
            function onError(callback){
                return onEvent(obj.listeners.click, callback);    
            }
            function show(force){
                if (style !== false){
                    if (obj.enable || force){
                        style.remove();
                    }
                }
                return obj;
            }
            function hide(){
                var text = args.selector + '{display:none;}'
                var styleSheet = document.createElement('style');
                document.getElementsByTagName('head')[0].appendChild(styleSheet);
                if (styleSheet.styleSheet) {
                    styleSheet.styleSheet.cssText = text;
                } else {
                    styleSheet.appendChild(document.createTextNode(text));
                }
                style = $(styleSheet);
                return obj;
            }
            function update(newConfig){
                $.extend(true, obj.config, newConfig);
                return obj
            }
            function addButton(arg){
                if (arg !== false){
                    obj.removeButton();
                }
                if (obj.paypalHook !== undefined && typeof(obj.paypalHook) === 'function'){
                    obj.paypalHook(obj.config);
                }
                return obj;
            }
            function addPaypal(config, cb){
                obj.config_default = config;
                obj.config = $.extend(true, {}, obj.config_default, obj.config);
                obj.config.events = (obj.config.events === undefined) ? {} : obj.config.events;
                obj.config.events.onClick = onClick;
                obj.config.events.onCancel = onCancel;
                obj.config.events.onError = onError;
                obj.paypalHook = cb;
                addButton();
                return obj;
            }
            function removeButton(){
                $(obj.selector).find('[id^="zoid-paypal-button"]').remove();
                return obj;
            }
            function found(){
                return $(obj.selector).length;
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
                }else if (args.type === 'googlePay'){

                }
                return e;
            }
            function loaded(){
                if (obj.type === 'paypal' && obj.paypalHook !== false){
                    return true;
                }else{
                    return false;
                }
            }
            function disableTest(){
                localStorage.setItem(obj.test.name, 'true');
            }
            function enableTest(){
                localStorage.removeItem(obj.test.name);
            }
            function findState(){
                return localStorage.getItem(obj.test.name);
            }
            function add_paypal_methods(){
                $.extend(true, obj, {
                    addPaypal: addPaypal,
                    addButton: addButton,
                    removeButton: removeButton,
                    paypalHook: false,
                    update: update,
                    loaded: loaded,
                    listeners: {
                        click: [],
                        cancel: [],
                        error: [],
                    },
                    register: register, 
                    registerClick: registerClick,
                    registerCancel: registerCancel,
                    registerError: registerError,
                    onClick: onClick,
                    onCancel: onCancel,
                    onError: onError
                });
            }
            function init(){
                if (obj.type === 'paypal' || obj.type === 'paypalCheckout' || obj.type === 'paypalCredit'){
                    add_paypal_methods();
                }
                if (obj.configTest !== undefined && obj.configTest.isTestingEnabled === true){
                    var time = 250;
                    hide();
                    function waitFor(){                 
                        if (findState() !== null){
                            show(true);
                        } else {
                            setTimeout(function(){
                                waitFor()
                            }, time)
                        }
                    }
                    waitFor();            
                }else{
                    show(true);
                }
  
                return obj
            }
            return obj
        },
              
    }
});