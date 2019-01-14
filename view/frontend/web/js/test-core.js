/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
], function ($) {
    'use strict';

    return {

        paymentMethod: function(args){
            var style = false;
            var obj = {
                config: args.config,
                eligible: args.eligible,
                selector: args.selector,
                show: show_payment,
                hide: hide_payment,
                init: init_payment
            }
            function show_payment(){
                (style !== false) ? style.remove() : null;
                return obj
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
            function init_payment(){
                if (obj.config.testEnabled === true){
                    return hide_payment();
                }else if (obj.config.testEnabled === false && obj.config.disabled === true){
                    return hide_payment();
                }else if (obj.config.testEnabled === false && obj.config.disabled === false){
                    return show_payment();
                }else {
                    return obj;
                }
                return obj
            }
            return obj
        },

        addToApi: function (testLocation, testName, obj) {
            window.braintreeHicApi = window.braintreeHicApi || {};
            window.braintreeHicApi[testLocation] = window.braintreeHicApi[testLocation] || {};
            window.braintreeHicApi[testLocation][testName] = obj;
        },

    }
});