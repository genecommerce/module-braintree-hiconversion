/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'Gene_BraintreeHiConversion/js/payment-method-config',
    'Gene_BraintreeHiConversion/js/payment-method-default',
], function ($, paymentMethodConfig, paymentMethodDefault) {
    'use strict';

    return {

        new: function(args){
            var style = false;
            var obj = {
                page: args.page,
                type: args.type,
                configTest: args.configTest,
                config: false,
                config_default: false,
                addPaypal: addPaypal,
                addButton: addButton,
                paypalHook: false,
                update: update,             
                paypal_listeners: {
                    click: [],
                    cancel: [],
                    error: [],
                },
                registerClick: registerClick,
                registerCancel: registerCancel,
                registerError: registerError,
                onClick: onClick,
                onCancel: onCancel,
                onError: onError,
                eligible: eligible(),        
                removeButton: removeButton,
                selector: args.selector,
                enable: null,
                options: null,
                show: show,
                hide: hide,
                init: init,
                found: found,
                loaded: loaded,
            }
            function register(type, cb){
                return (typeof(cb) === "function") ? obj.paypal_listeners[type].push(cb) : "must be function";
            }
            function registerClick(cb){
                return register("click", cb);
            }
            function registerCancel(cb){
                return register("cancel", cb);
            }
            function registerError(cb){
                return register("error", cb);
            }
            function onClick(callback){
                $.each(obj.paypal_listeners.click, function(i, cb){
                    cb(callback);
                })
            }
            function onCancel(callback){
                $.each(obj.paypal_listeners.cancel, function(i, cb){
                    cb(callback);
                })
            }
            function onError(callback){
                $.each(obj.paypal_listeners.error, function(i, cb){
                    cb(callback);
                })                
            }
            function show(force){
                if (style !== false){
                    if (obj.enable || force){
                        style.remove();
                    }
                }
                return obj
            }
            function hide(){
                var text = args.selector + '{display:none;}'
                var styleSheet = document.createElement('style');
                document.getElementsByTagName('head')[0].appendChild(styleSheet);
                if (styleSheet.styleSheet) {
                    // ie case
                    styleSheet.styleSheet.cssText = text;
                } else {
                    styleSheet.appendChild(document.createTextNode(text));
                }
                style = $(styleSheet);
                return obj
            }
            function addPaypal(config, cb){
                obj.config_default = config;
                obj.config = (obj.config === false) ? obj.config_default : obj.config;
                obj.config.events = (obj.config.events === undefined) ? {} : obj.config.events;
                obj.config.events.onClick = onClick;
                obj.config.events.onCancel = onCancel;
                obj.config.events.onError = onError;
                obj.paypalHook = cb;
                if (obj.configTest.isTestingEnabled === false){
                    addButton();
                }else if (obj.configTest.isTestingEnabled === true && obj.page === 'checkout'){
                    addButton();
                }
            }
            function update(newConfig){
                obj.config = $.extend(true, {}, obj.config, newConfig);
                return obj
            }
            function addButton(arg){
                if (arg !== false){
                    obj.removeButton();
                }
                if (obj.paypalHook !== undefined && typeof(obj.paypalHook) === 'function'){
                    obj.paypalHook(obj.config);
                }
            }
            function removeButton(){
                $(obj.selector).find('[id^="zoid-paypal-button"]').remove();
            }
            function found(){
                return $(obj.selector).length
            }        
            function add_button_options(){
                var all_options = paymentMethodConfig.paymentConfig()[obj.paymentMethod];        
                obj.options = (all_options !== undefined) ? all_options : null;
            }
            function eligible(){
                var e = {
                    config: true,
                    test: true,
                }
                if (args.paymentMethod === 'applePay'){
                    e.secure = (location.protocol === 'https:') ? true : false;
                    e.apple_device = false;
                    e.proper_device = false;
                    e.user = false;  
                    if (window.ApplePaySession !== undefined){
                        e.apple_device = true;
                        if (window.ApplePaySession.canMakePayments() === true){
                            e.proper_device = true;
                            var merchant_id = "";
                            ApplePaySession.canMakePaymentsWithActiveCard(merchant_id).then(function (canMakePayments) {
                                e.user = canMakePayments;                
                            })
                        }
                    }             
                }else if (args.paymentMethods === 'googlePay'){

                }
                return e
            }
            function loaded(){
                if (obj.type === 'paypal' && obj.paypalHook !== false){
                    return true;
                }else{
                    return false;
                }
            }
            function init(){
                if (obj.configTest !== undefined && obj.configTest.isTestingEnabled === true){
                    hide();
                }else{
                    show();
                }
                return obj
            }
            return obj
        },
              
    }
});