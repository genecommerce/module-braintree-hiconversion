define([
    'uiComponent',
    'Magento_Braintree/js/paypal/button',
    'Gene_BraintreeHiConversion/js/test-core'
], function (
    Component,
    Button,
    hicCore
) {
        'use strict';
        return Component.extend({
            initialize: function () {
                this._super();
                var _config = {
                    color: this.config.color,
                    shape: this.config.shape,
                    size: this.config.size,
                    layout: this.config.layout,
                    disabledFunding: this.config.disabledFunding
                };

                // @todo call HIC's API with a promise?
                // Pass through _config which HIC can modify and return
                // the callback here then calls new Button(config);


                hicCore.interceptPaypalButton(_config, function (_config) {
                    this.config.color = _config.color;
                    this.config.shape = _config.shape;
                    this.config.size = _config.size;
                    this.config.layout = _config.layout;
                    this.config.disabledFunding = _config.disabledFunding;
                    new Button(this.config);
                }.bind(this));
            
                return this;
            },
        });
    }
);