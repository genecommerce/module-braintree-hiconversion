/**
 * Copyright 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
/*global define*/
define([
    'underscore',
    'jquery',
    'Magento_Braintree/js/view/payment/adapter',
    'Gene_BraintreeHiConversion/js/test-core'
], function (_, $, Adapter, hicCore) {
    'use strict';

    if (!window.checkoutConfig || !window.checkoutConfig.hiconversion || window.checkoutConfig.hiconversion.isEnabled !== true) {
        return Adapter;
    }
     
    Adapter.originalSetupPaypal = Adapter.setupPaypal;

    return _.extend(Adapter, {
        hicConfig: {
            color: null,
            shape: null,
            size: null,
            layout: null,
            label: null,
            branding: null,
            fundingicons: null,
            disabledFunding: null,
        },

        /**
         * @inheritDoc
         */ 

        getColor: function () {
            return (this.hicConfig.color && this.hicConfig.color.length) ? this.hicConfig.color
                : window.checkoutConfig.payment[this.getCode()].style.color;
        },
        
        /**
         * @inheritDoc
         */

        getShape: function () {
            return (this.hicConfig.shape && this.hicConfig.shape.length) ? this.hicConfig.shape
                : window.checkoutConfig.payment[this.getCode()].style.shape;
        },

        /**
         * @inheritDoc
         */
 
        getLayout: function () {
            return (this.hicConfig.layout && this.hicConfig.layout.length) ? this.hicConfig.layout
                : window.checkoutConfig.payment[this.getCode()].style.layout;
        },    

        /**
         * @inheritDoc
         */
   
        getSize: function () {
            return (this.hicConfig.size && this.hicConfig.size.length) ? this.hicConfig.size
                : window.checkoutConfig.payment[this.getCode()].style.size;
        },

        /**
         * @inheritDoc
         */
      
        getLabel: function () {
            return (this.hicConfig.label && this.hicConfig.label.length) ? this.hicConfig.label : null;
        },

        /**
         * @inheritDoc
         */
    
        getBranding: function () {
            return (this.hicConfig.branding && this.hicConfig.branding.length) ? this.hicConfig.branding : null;
        },

        /**
         * @inheritDoc
         */
  
        getFundingIcons: function () {
            return (typeof(this.hicConfig.fundingicons) === 'boolean') ? this.hicConfig.fundingicons : null;
        },

        /**
         * @inheritDoc
         */
 
        getDisabledFunding: function () {
            return ($.isPlainObject(this.hicConfig.disabledFunding)) ? this.hicConfig.disabledFunding
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
            
            var page = 'checkout';
            var type = this.config.offerCredit == true ? 'paypalCredit' : 'paypalCheckout';
            var button_config = window.checkoutConfig.payment[this.getCode()];
    
            var api = hicCore.api().load();                
            api.loadPaypal(page, type, button_config, function (_config) {

                this.hicConfig.color = _config.style.color;
                this.hicConfig.shape = _config.style.shape;
                this.hicConfig.size = _config.style.size;
                this.hicConfig.layout = _config.style.layout;
                this.hicConfig.disabledFunding = _config.disabledFunding;
                this.hicConfig.label = _config.label;
                this.hicConfig.branding = _config.branding;
                this.hicConfig.fundingIcons = _config.fundingicons;
                this.hicConfig.tagline = _config.tagline;
                this.events = _config.events;

                this.originalSetupPaypal();

            }.bind(this));
        
        }
    });
});

