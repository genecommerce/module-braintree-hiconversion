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
                addPaypal: addPaypal,
                addButton: addButton,
                config: args.config,
                config_default: false,             
                paypalHook: false,
                eligible: eligible(),                
                removeButton: removeButton,
                selector: args.selector,
                options: null,
                show: show,
                update: update,
                hide: hide,
                init: init_payment,
                found: found,
            }
            function show(){
                (style !== false) ? style.remove() : null;                
                return obj
            }
            function addPaypal(config, cb){
                obj.config_default = config;
                obj.config = config;
                obj.paypalHook = cb;
            }
            function update(newConfig){
                obj.config = $.extend(true, {}, obj.config, newConfig);
                return obj
            }
            function addButton(arg){
                if (arg !== false){
                    obj.removeButton();
                }
                if (obj.paypalHook !== undefined && typeof(obj.paypalHook) === "function"){
                    obj.paypalHook(obj.config);
                }
            }
            function removeButton(){
                $(obj.selector).find("[id^='zoid-paypal-button']").remove();
            }
            function found(){
                return $(obj.selector).length
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
            function add_button_options(){
                var all_options = paymentMethodConfig.paymentConfig()[obj.paymentMethod];        
                obj.options = (all_options !== undefined) ? all_options : null;
            }
            function eligible(){
                var e = {
                    config:  true,
                    test: true,
                }
                if (args.paymentMethod === "applePay"){
                    e.secure = (location.protocol === "https:") ? true : false;
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
                }else if (args.paymentMethods === "googlePay"){

                }
                return e
            }
            function init_payment(){
                //add_button_options();
                //hide_payment();
                //if (args.paymentMethods === "paypalCheckout"){
                //    braintreeHicApi.setupPaypalButton({layout: 'horizontal', color:'black'});
                //}
                return obj
            }
            return obj
        },
              
    }
});