<?php

namespace Gene\BraintreeHiConversion\Plugin\Gateway;
use Gene\BraintreeHiConversion\Helper\Data;

/**
 * Class ChannelData
 * @package Gene\BraintreeHiConversion\Plugin\Gateway
 */
class ChannelData
{
    /**
     * @var Data
     */
    private $helper;

    /**
     * HicChannelDataPlugin constructor.
     * @param Data $helper
     */
    public function __construct(
        Data $helper
    ) {
        $this->helper = $helper;
    }

    /**
     * Override original channel value if HIC one available
     * @param $subject
     * @param $result
     * @return array
     */
    public function afterBuild(
        Magento\Braintree\Gateway\Request\ChannelDataBuilder $subject,
        $result
    ) {
        $newBnCode = $this->helper->getBNCode();
        if (!empty($newBnCode)) {
            $result = [
                'channel' => $newBnCode
            ];
        }

        return $result;
    }
}