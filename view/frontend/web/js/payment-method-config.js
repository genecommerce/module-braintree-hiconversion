/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
], function ($) {
    'use strict';

    return {
        paymentConfig: function(){
            var options = {
                paypalVertical: {
                    label: 'vertical',
                    style: {
                        layout: 'horizontal',
                        size: {
                            default: 'medium',
                            options: ['medium','large','responsive']
                        },
                        shape: {
                            default: 'rect',
                            options: ['pill','rect']
                        },
                        color: {
                            default: 'gold',
                            options: ["gold","blue","silver","black","white"]
                        }                        
                    },
                    funding: {
                        allowed: {
                            default: ["paypal.FUNDING.CARD","paypal.FUNDING.CREDIT"],
                            options: ["paypal.FUNDING.CARD","paypal.FUNDING.CREDIT","paypal.FUNDING.ELV"],
                        },
                        disallowed: {
                            default: [],
                            options: ["paypal.FUNDING.CREDIT","paypal.FUNDING.ELV"],
                        }
                    },
                },
                paypalHorizontal: {
                    label: "horizontal",
                    style: {
                        layout: 'horizontal',
                        size: {
                            default: 'medium',
                            options: ['small','medium','large','responsive']
                        },
                        shape: {
                            default: 'rect',
                            options: ['pill','rect']
                        },
                        color: {
                            default: 'gold',
                            options: ["gold","blue","silver","black","white"]
                        },
                        fundingicons: {
                            default: 'false',
                            options: ['false','true']
                        },
                        tagline:{
                            default: 'false',
                            options: ['false','true'],
                            dependency: "tagline will only show if funding icons set to false"
                        }
                    },
                    funding: {
                        allowed: {
                            default: ["paypal.FUNDING.CARD","paypal.FUNDING.CREDIT"],
                            options: ["paypal.FUNDING.CARD","paypal.FUNDING.CREDIT","paypal.FUNDING.ELV"],
                        },
                        disallowed: {
                            default: [],
                            options: ["paypal.FUNDING.CREDIT","paypal.FUNDING.ELV"],
                        }
                    }
                },
                paypalCheckout: {
                    label: 'checkout',
                    style: {
                        color: {
                            default: "gold",
                            options: ["gold","blue","silver","black","white"]
                        },
                        shape: {
                            default: 'rect',
                            options: ['pill','rect']
                        },
                        size: {
                            default: "medium",
                            options: ['small','medium','large','responsive']
                        },
                        tagline: {
                            default: "false",
                            options: ["false","true"]
                        }
                    }
                },              
                paypalCredit: {
                    label: 'credit',
                    style: {
                        color: {
                            default: "darkblue",
                            options: ["darkblue",'black','white']
                        },
                        shape: {
                            default: 'rect',
                            options: ['pill','rect'],
                        },
                        size: {                        
                            default: 'medium',
                            options: ['small','medium','large','responsive']
                        },
                        tagline: {
                            default: "false",
                            options: ["false","true"]
                        }
                    }     
                },
                paypalPay: {
                    label: 'pay',                                
                    style: {
                        color: {
                            default: "gold",
                            options: ["gold","blue","silver","black","white"]
                        },
                        shape: {
                            default: 'rect',
                            options: ['pill','rect']
                        },
                        size: {
                            default: 'small',
                            options: ['small','medium','large','responsive']
                        },
                        tagline: {
                            default: "false",
                            options: ["false","true"]
                        }
                    }
                },
                paypalBuyNow: {
                    label: 'buynow',
                    style: {
                        color: {
                            default: 'gold',
                            options: ['gold','blue','silver','black','white']
                        },
                        shape: {
                            default: "rect",
                            options: ['pill','rect']
                        },
                        size: {
                            default: 'small',
                            options: ['gold','blue','silver','black','white']
                        }
                    }
                },    
                applePay: {
                    label: "applepay",
                    style: {
                        color: {
                            default: 'black',
                            options: ['black','white']
                        }
                    }
                },
                googlePay: {
                    label: "googlepay",
                    style: {
                        color: {
                            default: 'black',
                            options: ['black','white']
                        }
                    }
                }
            }
            return options
        },        
              
    }
});