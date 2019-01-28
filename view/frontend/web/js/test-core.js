/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'Gene_BraintreeHiConversion/js/payment-method',
    'Gene_BraintreeHiConversion/js/payment-method-config'
], function ($, paymentMethod, paymentMethodConfig) {
    'use strict';

    return {            
        
        paymentMethods: function(){
            var default_obj = {
                add: add,
                payment_methods: [],
                support: {
                    pdp: ['paypalCheckout','paypalCredit'],
                    minicart: ['paypalCheckout','paypalCredit','applePay','googlePay'],
                    cart: ['paypalCheckout','paypalCredit','applePay','googlePay'],
                },
                /* Default Payment Button Options */
                options: paymentMethodConfig.paymentConfig(),
                /* Find things */
                find: find,
                page: findPage,
                method: findMethod,
                finder: finder,
                /* Pages */
                pdp: findProductPage,
                minicart: findMinicart,
                cart: findCart,
                /* Methods */
                paypalCheckout: findPaypalCheckout,
                paypalCredit: findPaypalCredit,
                googlePay: findGooglePay,
                applePay: findApplePay,
            }
            //window.hic_paymentmethods = (window.hic_paymentmethods === undefined) ? default_obj : window.hic_paymentmethods;            
            //var obj = window.hic_paymentmethods;
            window.braintreeHicApi = (window.braintreeHicApi === undefined ? default_obj : window.braintreeHicApi);
            var obj = window.braintreeHicApi;
            function add(args){            
                var test_payment = paymentMethod.new(args).init();
                obj.payment_methods.push(test_payment);
            }
            /* Pages */
            function findProductPage(){
                return findPage("pdp");
            }
            function findMinicart(type){
                //return findPage("minicart");
                var minicart_matches = findPage("minicart");
                if (type === undefined){
                    return minicart_matches
                }else{
                    var matches = [];
                    $.each(minicart_matches, function(i,v){
                        if (v.paymentMethod === type){
                            matches.push(v);
                        }
                    })
                    matches = (matches.length === 1) ? matches[0] : null;
                    return matches
                }

            }
            function findCart(type){
                //return findPage("cart");
                var cart_matches = findPage("cart");
                if (type === undefined){
                    return cart_matches
                }else{
                    var matches = [];
                    $.each(cart_matches, function(i,v){
                        if (v.paymentMethod === type){
                            matches.push(v);
                        }
                    })
                    matches = (matches.length === 1) ? matches[0] : null;
                    return matches
                }
            }
            /* Methods */
            function findPaypalCheckout(){
                return findMethod("paypalCheckout");
            }
            function findPaypalCredit(){
                return findMethod("paypalCredit");
            }
            function findApplePay(){
                return findMethod("applePay");
            }
            function findGooglePay(){
                return findMethod("googlePay");
            }            

            function findPage(page){
                if (obj !== undefined && obj.payment_methods !== undefined){
                    var matches = [];
                    $.each(obj.payment_methods, function(i,v){
                        if (v.page === page){
                            matches.push(v);
                        }
                    })
                    return matches;
                }
            }
            function findMethod(payment_method){
                if (obj !== undefined && obj.payment_methods !== undefined){
                    var matches = [];
                    $.each(obj.payment_methods, function(i,v){
                        if (v.paymentMethod === payment_method){
                            matches.push(v);
                        }
                    })
                    return matches;
                }
            }
            function finder(key, key_value){
                if (obj !== undefined && obj.payment_methods !== undefined){
                    var matches = [];
                    $.each(obj.payment_methods, function(i,v){
                        if (v[key] === key_value){
                            matches.push(v);
                        }
                    });
                    return matches;
                }
            }
            function find(args){
                
            }
            return obj;
        },

        interceptPaypalButton: function (existing_config, cb) {
            window.passed_config = existing_config;
            window.braintreeHicApi = window.braintreeHicApi || {};
            window.braintreeHicApi.setupPaypalButton = function(newConfig) {
                var configCopy = $.extend(true, {}, existing_config, newConfig);
                // modify configCopy relative to our changes
                cb(configCopy);
            };
        },

        addToApi: function (testLocation, testName, obj) {
            window.braintreeHicApi = window.braintreeHicApi || {};
            window.braintreeHicApi[testLocation] = window.braintreeHicApi[testLocation] || {};
            window.braintreeHicApi[testLocation][testName] = obj;
        },

    }
});