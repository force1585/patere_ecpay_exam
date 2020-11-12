const express = require('express');
const router = express.Router();
const dateFormat = require('dateformat');
const cryptoRandomString = require('crypto-random-string');
const EcpayPayment = require('ecpay-payment')

router.post('/', async function(req, res, next) {
  const unitPrice = 100;
  const tradeDate = dateFormat(new Date(), "yyyy/mm/dd HH:mm:ss");
  const merchantTradeNo = cryptoRandomString({length:20});
  const RelateNumber = cryptoRandomString({length:30});
  const totalPrice = unitPrice*req.body.number;

  let base_param = {
    MerchantID:2000132,
    MerchantTradeNo: merchantTradeNo, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    MerchantTradeDate: tradeDate, //ex: 2017/02/13 15:45:30
    PaymentType: 'aio',
    TotalAmount: totalPrice,
    TradeDesc: 'payment exam',
    ItemName: 'patere 1',
    ReturnURL: 'https://us-central1-qraft-app.cloudfunctions.net/dev-createSampleOrder',
    ChoosePayment: 'Credit'
  };

  let inv_params = {
    RelateNumber: RelateNumber,  //請帶30碼uid ex: SJDFJGH24FJIL97G73653XM0VOMS4K
    CustomerID: '',  //會員編號
    CustomerIdentifier: '',   //統一編號
    CustomerName: '測試買家',
    CustomerAddr: '測試用地址',
    CustomerPhone: '0123456789',
    CustomerEmail: 'johndoe@test.com',
    ClearanceMark: '2',
    TaxType: '1',
    CarruerType: '',
    CarruerNum: '',
    Donation: '2',
    LoveCode: '',
    Print: '1',
    InvoiceItemName: 'patere 1',
    InvoiceItemCount: req.body.number,
    InvoiceItemWord: 'pieces',
    InvoiceItemPrice: '100',
    InvoiceItemTaxType: '1',
    InvoiceRemark: '測試商品1的說明',
    DelayDay: '0',
    InvType: '07'
  };

  const create = new EcpayPayment();
  const htm = create.payment_client.aio_check_out_all(base_param, inv_params);
  res.send(htm);
});

module.exports = router;
