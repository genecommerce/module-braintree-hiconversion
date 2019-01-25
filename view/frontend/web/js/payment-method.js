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
                paymentMethod: args.paymentMethod,
                config: args.config,                
                eligible: eligible(),
                selector: args.selector,
                options: null,
                show: show_payment,
                hide: hide_payment,
                init: init_payment,
                found: found,
            }
            function show_payment(){
                (style !== false) ? style.remove() : null;
                return obj
            }
            function found(){
                return $(obj.selector).length
            }        
            function hide_payment(){
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
                    var merchant_id = "";
                    if (window.ApplePaySession !== undefined){
                        e.apple_device = true;
                        if (window.ApplePaySession.canMakePayments() === true){
                            e.proper_device = true;
                            ApplePaySession.canMakePaymentsWithActiveCard(merchant_id).then(function (canMakePayments) {
                                e.user = canMakePayments;                
                            })
                        }
                    }             
                }else if (args.paymentMethods === "googlePay"){

                }else if (args.paymentMethods === "paypalCheckout"){
                    
                }
                return e
            }
            function init_payment(){
                add_button_options();
                hide_payment();
                return obj
            }
            return obj
        },
              
    }
});