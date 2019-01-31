<?php

namespace Gene\BraintreeHiConversion\Plugin\PayPal;

/**
 * Class CartButton
 * Replace the template used by the cart button to use the HIC one
 * @package Gene\BraintreeHiConversion\Plugin\PayPal
 */
class CartButton
{
    const TEMPLATE_PATH = 'Gene_BraintreeHiConversion::paypal/cartbutton.phtml';

    /**
     * @var \Hic\Integration\Helper
     */
    protected $helper;

    /**
     * CartButton constructor.
     * @param \Gene\BraintreeHiConversion\Helper\Data $helper
     */
    public function __construct(
        \Gene\BraintreeHiConversion\Helper\Data $helper
    ) {
        $this->helper = $helper;
    }

    /**
     * Modify the template for the PayPal button block only if the config options to "test" are enabled.
     * @param \Magento\Braintree\Block\Paypal\Button $subject
     * @param $result
     * @return string
     */
    public function afterGetTemplate(\Magento\Braintree\Block\Paypal\Button $subject, $result)
    {
        if ($this->helper->isTestingEnabled()) {
            return self::TEMPLATE_PATH;
        }

        return $result;
    }
}