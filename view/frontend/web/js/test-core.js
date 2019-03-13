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
        api: function(){
            var group = null;
            var obj = {
                payment_methods: [],
                paymentMethods: {
                    enabled: [],
                    disabled: [],
                    all: [],
                },
                add: add,
                loadPaypal: loadPaypal,                
                page: findPage,
                method: findMethod,
                device: findDevice,
                search: search,
                find: find,
                pdp: findProduct,
                minicart: findMinicart,
                cart: findCart,
                checkout: findCheckout,
                config: null,
                show: show,
                hide: hide,
                postMessage: postMessage,
                timing: {
                    btReady: false,
                    hicReady: false,
                    hicLate: false,
                    totalTime: 0,
                },
                test: {
                    config: null
                },
                hicReady: hicReady,
                version: "1.0.0",       
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
            function postMessage(args){
                var loc = document.location || window.location;
                var origin = loc.origin || loc.protocol + "//" + loc.host;
                var baseConfig = {
                    group: 'update-bt-ge-hi'
                };
                var config = $.extend({}, baseConfig, args);
                window.postMessage({config}, origin);
            }
            function hicReady(){
                if (obj.timing.hicLate === true) {
                    return false;
                }else{
                    obj.timing.hicReady = true;
                    return true;
                }
            }                   
            function add(args){
                args.device = findDevice();
                var wallet = paymentMethod.new(args).init();
                if (wallet.enabled === true){
                    obj.payment_methods.push(wallet);
                    obj.paymentMethods.enabled.push(wallet);
                    postMessage({
                        name: 'paymentMethodAdded',
                        page: wallet.page,
                        type: wallet.type,
                    });
                }else{
                    obj.paymentMethods.disabled.push(wallet);
                }
                obj.paymentMethods.all.push(wallet);
            }
            function loadPaypal(page, type, config, cb){
                var time_interval = 250;
                var total_time = 0;
                function waitForPaypal(){                                                
                    total_time = total_time + time_interval;
                    var wallet = obj.find({page: page, type: type})
                    if (wallet !== false){
                        wallet.addPaypal(config, cb);
                    }else{
                        setTimeout(function(){
                            waitForPaypal();
                        }, time_interval);
                    }
                }
                waitForPaypal();
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
                var wallets = (args.match === undefined) ? obj.payment_methods : obj.paymentMethods[args.match];
                delete args.match;
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

            function load(){
                if (window.braintreeHicApi === undefined){
                    window.braintreeHicApi = obj;
                    return window.braintreeHicApi;
                }else{
                    obj = window.braintreeHicApi;
                    return obj;
                }
            }
            function page(args){   
                load();
                obj.config = args.configTest;
                group = args;
                return obj;
            }
            return {
                page: page,
                load: load
            }
        },
    }
});