<?php

namespace Gene\BraintreeHiConversion\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Store\Model\ScopeInterface;

/**
 * Class Data
 * @package Gene\BraintreeHiConversion\Helper
 * @author HiConversion <support@hiconversion.com>
 */
class Data extends AbstractHelper
{
    const KEY_TESTING_ENABLED = 'hiconversion/configuration/bt_enabled';

    /**
     * @return boolean
     */
    public function isTestingEnabled()
    {
        return (bool) $this->scopeConfig->getValue(
            self::KEY_TESTING_ENABLED,
            ScopeInterface::SCOPE_STORE
        );
    }
}
