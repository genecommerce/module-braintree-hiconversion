<?php

namespace Gene\BraintreeHiConversion\Model\Ui;
    
use Magento\Checkout\Model\ConfigProviderInterface;
use Gene\BraintreeHiConversion\Helper\Data;

/**
 * Class ConfigProvider
 */
final class ConfigProvider implements ConfigProviderInterface
{
    /**
     * @var \Hic\Integration\Helper
     */
    private $helper;

    /**
     * ConfigProvider constructor.
     * @param Data $helper
     */
    public function __construct(
        Data $helper
    ) {
        $this->helper = $helper;
    }
    /**
     * Retrieve assoc array of checkout configuration
     *
     * @return array
     */
    public function getConfig()
    {
        return [
            'hiconversion' => [
                'isEnabled' => $this->helper->isEnabled(),
                'isTestingEnabled' => $this->helper->isTestingEnabled()
            ]
        ];
    }
}
