<?php

namespace Gene\BraintreeHiConversion\CustomerData;

use Magento\Customer\CustomerData\SectionSourceInterface;

/**
 * Class CartData
 * @package Magento\Braintree\CustomerData
 * @author HiConversion <support@hiconversion.com>
 */
class CartData implements SectionSourceInterface
{
    /**
     * @var \Gene\BraintreeHiConversion\Helper\Data
     */
    private $helper;

    /**
     * CartData constructor.
     * @param \Gene\BraintreeHiConversion\Helper\Data $helper
     */
    public function __construct(
        \Gene\BraintreeHiConversion\Helper\Data $helper
    ) {
        $this->helper = $helper;
    }

    /**
     * {@inheritdoc}
     */
    public function getSectionData()
    {
        $data = [];
        if ($this->helper->isEnabled()) {
            $cart = $this->getCartData();
            if (null !== $cart) {
                $data = $cart;
            }
        } else {
            $data["disabled"] = true;
        }
        return $data;
    }

    /**
     * gets cart data from helper
     *
     * @return object
     */
    private function getCartData()
    {
        return $this->helper->getCartData();
    }
}
