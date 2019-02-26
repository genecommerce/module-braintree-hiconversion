/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'Gene_BraintreeHiConversion/js/payment-method',
    'Gene_BraintreeHiConversion/js/payment-method-config',
], function ($, paymentMethod, paymentMethodConfig) {
    'use strict';

    return {            
        
        paymentMethods: function(){
            var default_obj = {                
                payment_methods: [],
                add: add,
                loadPaypal: loadPaypal,                
                options: paymentMethodConfig.paymentConfig(),
                page: findPage,
                method: findMethod,
                device: findDevice(),
                search: search,
                find: find,
                pdp: findProduct,
                minicart: findMinicart,
                cart: findCart,
                checkout: findCheckout,
                show: show,
                hide: hide,
                timing: {
                    btReady: false,
                    hicReady: false,
                    hicLate: false,
                    totalTime: 0,
                },
                hicReady: hicReady
            }

            function show(){
                $.each(obj.payment_methods, function(i,payment_method){
                    payment_method.elem.show(true);
                });
            }
            function hide(){
                $.each(obj.payment_methods, function(i,payment_method){
                    payment_method.elem.hide();
                });
            }

            function backup(){
                var time_interval = 250;
                var total_time = 0;
                var time_limit = 15000;
                function waitFor(){                                                
                    total_time = total_time + time_interval;
                    obj.timing.totalTime = total_time;
                    if (obj.timing.hicReady === false && total_time > time_limit){
                        obj.timing.hicLate = true;
                        obj.show();
                    }else if (obj.timing.hicReady === false){
                        setTimeout(function(){
                            waitFor();
                        }, time_interval);
                    }
                }
                waitFor();
            }

            function hicReady(){
                if (obj.timing.hicLate === true) {
                    return false;
                }else{
                    obj.timing.hicReady = true;
                    return true;
                }
            }

            if (window.braintreeHicApi === undefined){
                window.braintreeHicApi = default_obj;
                var obj = window.braintreeHicApi;
                backup();
            }else{
                window.braintreeHicApi = window.braintreeHicApi;
                var obj = window.braintreeHicApi;
            }
            
            function add(args){            
                var test_payment = paymentMethod.new(args).init();
                obj.payment_methods.push(test_payment);
            }
            function loadPaypal(location, type, config, cb){                                
                var method = obj.find({page: location, type: type});
                if (typeof(method === 'object') && method.length === undefined){
                    method.addPaypal(config, cb);
                }
            }
            function findDevice(){
                var width = window.matchMedia('screen and (min-width: 768px)').matches;
                var height = window.matchMedia('screen and (min-height: 768px)').matches;
                var noHover = window.matchMedia('(hover: none)').matches;
                var device = null;
                if (height === false || width === false){
                    device = 'mobile';
                }else{
                    device = (noHover) ? 'tablet' : 'desktop';
                }
                return device;
            }
            /* Pages */
            function findProduct(type){
                return obj.find({page: 'pdp', type: type});
            }
            function findMinicart(type){
                return obj.find({page: 'minicart', type: type});
            }
            function findCart(type){
                return obj.find({page: 'cart', type: type});
            }
            function findCheckout(type){
                return obj.find({page: 'checkout', type: type})
            }
            function findPage(page){
                return obj.find({page: page});
            }
            function findMethod(payment_method){
                return obj.find({type: payment_method})
            }
            function search(args){
                var matches = [];
                $.each(obj.payment_methods, function(index,button){
                        var match = true;
                        $.each(args, function(match_key, match_value){
                            if (match === false || button[match_key] === undefined || button[match_key] !== match_value){
                                match = false;
                            }
                        })
                        if (match === true){
                            matches.push(button);
                        }
                })
                return matches;
            }
            function find(args){
                var matches = search(args)
                return (matches.length === 1) ? matches[0] : false;
            }
            return obj;
        },
    }
});