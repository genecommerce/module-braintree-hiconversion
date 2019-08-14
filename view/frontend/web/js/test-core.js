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
        api: function () {
            var group = null;
            /* test */
            var obj = {
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
                backup: backup,
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
                version: "1.2.0",
                extendDesiredConfig: extendDesiredConfig,
                applyDesiredConfig: applyDesiredConfig,
                extendAndApplyDesiredConfig: extendAndApplyDesiredConfig,
                setTestState: setTestState,
                getTestState: getTestState,
                isHiConversionTagEnabled: isHiConversionTagEnabled,
                desiredConfig: {
                    pdp: {
                        paypal: {
                            show: false,
                            config: {
                                fundingicons: false,
                            }
                        },
                        paypalCredit: {
                            show: false,
                            config: {}
                        },
                    },
                    minicart: {
                        applePay: {
                            show: false
                        },
                        googlePay: {
                            show: false
                        },
                        paypal: {
                            show: false,
                            config: {},
                        },
                        paypalCredit: {
                            show: false,
                            config: {}
                        },
                    },
                    cart: {
                        applePay: {
                            show: false
                        },
                        googlePay: {
                            show: false
                        },
                        paypal: {
                            show: false,
                            config: {}
                        },
                        paypalCredit: {
                            show: false,
                            config: {}
                        }
                    },
                    checkout: {
                        applePay: {
                            show: false
                        },
                        googlePay: {
                            show: false
                        },
                        paypal: {
                            show: false,
                            config: {}
                        },
                        paypalCredit: {
                            show: false,
                            config: {}
                        }
                    }
                }
            }
            function setShowState(showState) {
                $.each(obj.desiredConfig, function (walletLocation, wallets) {
                    $.each(wallets, function (walletType, walletConfig) {
                        walletConfig.show = showState;
                    })
                })
                obj.applyDesiredConfig();
            }
            function show(force) {
                setShowState(true);
            }
            function hide() {
                setShowState(false);
            }
            function postMessage(args) {
                var loc = document.location || window.location;
                var origin = loc.origin || loc.protocol + "//" + loc.host;
                var baseConfig = {
                    group: 'update-bt-ge-hi'
                };
                var config = $.extend({}, baseConfig, args);
                window.postMessage({ config }, origin);
            }
            function backup() {
                var time_interval = 250;
                var total_time = 0;
                var time_limit = 15000;
                function waitFor() {
                    total_time = total_time + time_interval;
                    obj.timing.totalTime = total_time;
                    if (obj.timing.hicReady === false && total_time > time_limit) {
                        obj.timing.hicLate = true;
                        obj.show(true);
                    } else if (localStorage.hicReadyTest === 'true') {
                        hicReady();
                    } else if (obj.timing.hicReady === false) {
                        setTimeout(function () {
                            waitFor();
                        }, time_interval);
                    }
                }
                waitFor();
            }
            function isHiConversionTagEnabled() {
                return (localStorage._hc_disable === "") ? true : false;
            }
            function hicReady() {
                return obj.timing.hicReady = (obj.timing.hicLate) ? false : true;
            }
            function add(args) {
                args.device = findDevice();
                var wallet = paymentMethod.new(args).init();
                (wallet.getEnabled() === true) ? (obj.paymentMethods.enabled.push(wallet)) : (obj.paymentMethods.disabled.push(wallet));
                obj.paymentMethods.all.push(wallet);
                postMessage({
                    name: 'paymentMethodAdded',
                    page: wallet.page,
                    type: wallet.type,
                    enabled: wallet.getEnabled(),
                });
            }
            function loadPaypal(page, type, config, cb) {
                var time_interval = 250;
                var total_time = 0;
                function waitForPaypal() {
                    total_time = total_time + time_interval;
                    var wallet = obj.find({ page: page, type: type })
                    if (wallet !== false) {
                        wallet.addPaypal(config, cb);
                    } else {
                        setTimeout(function () {
                            waitForPaypal();
                        }, time_interval);
                    }
                }
                waitForPaypal();
            }
            function findDevice() {
                var width = window.matchMedia('screen and (min-width: 768px)').matches;
                var height = window.matchMedia('screen and (min-height: 768px)').matches;
                var noHover = window.matchMedia('(hover: none)').matches;
                var device = null;
                if (height === false || width === false) {
                    device = 'mobile';
                } else {
                    device = (noHover) ? 'tablet' : 'desktop';
                }
                return device;
            }
            function findProduct(type) {
                return obj.find({ page: 'pdp', type: type });
            }
            function findMinicart(type) {
                return obj.find({ page: 'minicart', type: type });
            }
            function findCart(type) {
                return obj.find({ page: 'cart', type: type });
            }
            function findCheckout(type) {
                return obj.find({ page: 'checkout', type: type })
            }
            function findPage(page) {
                return obj.find({ page: page });
            }
            function findMethod(type) {
                return obj.find({ type: type })
            }
            function search(args, narrow) {
                var matches = [];
                var wallets = (narrow) ? obj.paymentMethods[narrow] : obj.paymentMethods.enabled;
                $.each(wallets, function (index, button) {
                    var match = true;
                    $.each(args, function (match_key, match_value) {
                        if (match === false || button[match_key] === undefined || button[match_key] !== match_value) {
                            match = false;
                        }
                    })
                    if (match === true) {
                        matches.push(button);
                    }
                })
                return matches;
            }
            function find(args, narrow) {
                var matches = search(args, narrow)
                return (matches.length === 1) ? matches[0] : false;
            }
            function setTestState(state) {
                /* tag on */
                /* tag dummy on */
                /* tag off */
                if (state === 'tagOn') {
                    /* all enabled buttons show if not in test */
                    window.localStorage.hicReadyTest = '',
                        window.localStorage._hc_disable = ''
                } else if (state === 'tagOff') {
                    /* all enabled buttons show after 15 seconds */
                    window.localStorage.hicReadyTest = '',
                        window.localStorage._hc_disable = 'true'
                } else if (state === 'dummyTagOn') {
                    /* all buttons are hidden */
                    window.localStorage.hicReadyTest = 'true',
                        window.localStorage._hc_disable = 'true'
                }
                window.location.reload();
            }
            function getTestState() {
                var testState
                if (isHiConversionTagEnabled() === true) {
                    testState = 'tagOn';
                } else {
                    if (localStorage.hicReadyTest === '') {
                        testState = 'tagOff';
                    } else if (localStorage.hicReadyTest === 'true') {
                        testState = 'dummyTagOn';
                    } else {
                        testState = null
                    }
                }
                var testStates = {
                    testState: testState,
                    isTestingEnabled: obj.isTestingEnabled,
                    testConfig: obj.config,
                    timing: obj.timing,
                    version: obj.version
                }
                return testStates;
            }
            function load() {
                if (window.braintreeHicApi === undefined) {
                    backup();
                    window.braintreeHicApi = obj;
                    return window.braintreeHicApi;
                } else {
                    obj = window.braintreeHicApi;
                    return obj;
                }
            }
            function page(args) {
                load();

                var konfig = $.extend({}, args.configTest);
                obj.isTestingEnabled = konfig.isTestingEnabled;
                delete konfig.isTestingEnabled;
                obj.config = konfig;

                group = args;
                return obj;
            }
            function extendDesiredConfig(desiredConfig) {
                obj.desiredConfig = $.extend(true, {}, obj.desiredConfig, desiredConfig);
                $.each(obj.desiredConfig, function (walletLocation, wallets) {
                    $.each(wallets, function (walletType, walletConfig) {
                        var wallet = find({ page: walletLocation, type: walletType });
                        if (wallet !== false) {
                            wallet.extendDesiredConfig({});
                        }
                    })
                })
                return obj.desiredConfig;
            }
            function applyDesiredConfig() {
                $.each(obj.desiredConfig, function (walletLocation, wallets) {
                    $.each(wallets, function (walletType, walletConfig) {
                        var wallet = find({ page: walletLocation, type: walletType });
                        if (wallet !== false) {
                            wallet.applyDesiredConfig();
                        }
                    })
                })
            }
            function extendAndApplyDesiredConfig(desiredConfig) {
                extendDesiredConfig(desiredConfig);
                applyDesiredConfig();
            }
            return {
                page: page,
                load: load
            }
        },
    }
});