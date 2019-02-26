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
                device: window.braintreeHicApi.device,
                config: {},
                config_default: {},
                init: init,
                elem: {
                    enable: false,
                    style: styleElem,
                    selector: args.selector,
                    hide: hide,
                    show: show,
                    found: found,
                },
                status: findStatus,
                test: {
                    eligible: eligible(),
                    config: args.configTest,
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
                return onEvent(obj.listeners.cancel, callback);
            }
            function onError(callback){
                return onEvent(obj.listeners.error, callback);    
            }
            function styleElem(){
                var elem = $('style[data-page="'+obj.page+'"][data-type="'+obj.type+'"]');
                return (elem.length === 0) ? false : elem;
            }
            function show(force){                
                if (styleElem() !== false){
                    if (obj.elem.enable !== false || force === true){
                        styleElem().remove();
                    }
                }
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
                return obj;
            }
            function update(newConfig){
                $.extend(true, obj.config, newConfig);
                return obj
            }
            function addButton(arg){
                if (arg !== false){
                    removeButton();
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
                $(obj.elem.selector).find('[id^="zoid-paypal-button"]').remove();
                return obj;
            }
            function found(){
                return $(obj.elem.selector).length;
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
            function findStatus(){
                return {
                    visible: (styleElem() !== false) ? false : true,
                    found: (found() === 1) ? true : false,
                    enableShow: (obj.elem.enable === false) ? false : true,
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

                if (/paypal/i.test(obj.type)){
                    add_paypal_methods();
                }

                var loc = document.location || window.location;
                var origin = loc.origin || loc.protocol + "//" + loc.host;
                window.postMessage({group: 'update-bt-ge-hi', page: obj.page, type: obj.type}, origin);

                if (obj.test.config !== undefined && obj.test.config.isTestingEnabled === true){
                    hide();
                }else{
                    show(true);
                }
  
                return obj;
            }
            return obj;
        },
              
    }
});