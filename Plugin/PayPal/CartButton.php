<?php

namespace Gene\BraintreeHiConversion\Plugin\PayPal;

/**
 * Class CartButton
 * @package Gene\BraintreeHiConversion\Plugin\PayPal
 */
class CartButton
{
    const TEMPLATE_PATH = 'Gene_BraintreeHiConversion::paypal/cartbutton.phtml';

    public function __construct(
    ) {
    }

    /**
     * Modify the template for the PayPal button block only if the config options to "test" are enabled.
     * @param \Magento\Braintree\Block\Paypal\Button $subject
     * @param $result
     * @return string
     */
    public function afterGetTemplate(\Magento\Braintree\Block\Paypal\Button $subject, $result)
    {
        return $result;
        return self::TEMPLATE_PATH;
    }
}