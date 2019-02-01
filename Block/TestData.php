<?php

namespace Gene\BraintreeHiConversion\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;

use Gene\BraintreeHiConversion\Helper\Data;

/**
 * Class TestData
 * @package Gene\BraintreeHiConversion\Block
 */
class TestData extends Template
{
    /**
     * @var Data
     */
    private $helper;

    /**
     * @param Context $context
     * @param Data $helper
     * @param array $data
     */
    public function __construct(
        Context $context,
        Data $helper,
        array $data = []
    ) {
        $this->helper = $helper;

        parent::__construct($context, $data);
    }


    /**
     * is hic enabled
     *
     * @return boolean
     */
    public function isEnabled()
    {
        return $this->helper->isEnabled();
    }


    /**
     * are braintree test enhancements enabled
     *
     * @return boolean
     */
    public function isTestingEnabled()
    {
        return $this->helper->isTestingEnabled();
    }
}
