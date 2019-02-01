/**
 * Copyright 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
/*global define*/
define([
    'underscore',
    'Magento_Braintree/js/view/payment/adapter'
], function (_, Adapter) {
    'use strict';

    // @todo is there a config value we can pass on window.checkoutConfig when not in use?
    /*
        if (window.checkoutConfig...HicEnabled !== true) {
            return Adapter;
        }
     */

    Adapter.originalSetupPaypal = Adapter.setupPaypal;

    return _.extend(Adapter, {
        hicConfig: {
            offerCredit: null,
            color: null,
            shape: null,
            size: null,
            layout: null,
            label: null,
            branding: null,
            fundingicons: null,
            disabledFunding: null,
        },

        events: {
            onClick: function () {
                console.log("click");
            },
            onCancel: function () {
                console.log("cancel");
            },
            onError: function (err) {
                console.log("error");
            },
        },

        /**
         * @inheritDoc
         */
        getColor: function () {
            return (this.hicConfig.color !== null) ? this.hicConfig.color
                : window.checkoutConfig.payment[this.getCode()].style.color;
        },

        /**
         * @inheritDoc
         */
        getShape: function () {
            return (this.hicConfig.shape !== null) ? this.hicConfig.shape
                : window.checkoutConfig.payment[this.getCode()].style.shape;
        },

        /**
         * @inheritDoc
         */
        getLayout: function () {
            return (this.hicConfig.layout !== null) ? this.hicConfig.layout
                : window.checkoutConfig.payment[this.getCode()].style.layout;
        },

        /**
         * @inheritDoc
         */
        getSize: function () {
            return (this.hicConfig.size !== null) ? this.hicConfig.size
                : window.checkoutConfig.payment[this.getCode()].style.size;
        },

        /**
         * @inheritDoc
         */
        getLabel: function () {
            return (this.hicConfig.label !== null) ? this.hicConfig.label : null;
        },

        /**
         * @inheritDoc
         */
        getBranding: function () {
            return (this.hicConfig.branding !== null) ? this.hicConfig.branding : null;
        },

        /**
         * @inheritDoc
         */
        getFundingIcons: function () {
            return (this.hicConfig.fundingicons !== null) ? this.hicConfig.fundingicons : null;
        },

        /**
         * @inheritDoc
         */
        getDisabledFunding: function () {
            return (this.hicConfig.disabledFunding !== null) ? this.hicConfig.disabledFunding
                : window.checkoutConfig.payment[this.getCode()].disabledFunding;
        },

        /**
         * @inheritDoc
         */
        setupPaypal: function () {
            if (this.config.paypalInstance) {
                fullScreenLoader.stopLoader(true);
                return;
            }

            hicCore.interceptPaypalButton('checkout', this.hicConfig, function (_config) {
                this.hicConfig.color = _config.color;
                this.hicConfig.shape = _config.shape;
                this.hicConfig.size = _config.size;
                this.hicConfig.layout = _config.layout;
                this.hicConfig.disabledFunding = _config.disabledFunding;
                this.hicConfig.label = _config.label;
                this.hicConfig.branding = _config.branding;
                this.hicConfig.fundingicons = _config.fundingicons;
                this.hicConfig.tagline = _config.tagline;

                this.originalSetupPaypal();
            }.bind(this));
        }
    });
});

