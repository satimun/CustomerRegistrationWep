/* eslint-disable camelcase */
export const status = [
  { text: 'Active', value: 'A' },
  { text: 'Inactive', value: 'I' },
  { text: 'Cancel', value: 'C' }
]

export const yes_no = [
  { text: 'Yes', value: true },
  { text: 'No', value: false }
]

export const cloneCostMode = [
  { text: 'Clone a cost', value: 'Y' },
  { text: 'Not clone a cost', value: 'N' }
]

export const multivalue = { id: 0, description: '[Multiple values]', _label: '[Multiple values]' }

export const textColor = ['none', 'primary', 'warning', 'info', 'success', 'danger']

export const configMode = {
  Add: { class: 'primary' },
  Edit: { class: 'warning' },
  Clone: { class: 'success' },
  View: { class: 'info' },
  Delete: { class: 'danger' },
  Approved: { class: 'success' },
  NotApproved: { class: 'warning' }
}

export const themes = {
  default: '/themes/defualt.css',
  dark: '/themes/dark.css',
  green: '/themes/green.css',
  pink: '/themes/pink.css'
}

export const fonts = {
  default: '/fonts/defualt.css',
  kanit: '/fonts/kanit.css',
  prompt: '/fonts/prompt.css'
}

export const cost = [
  { text: 'STD Cost', value: false },
  { text: 'PD Cost', value: true }
]

export const urgent = [
  { text: 'Not Urgent', value: false },
  { text: 'Urgent', value: true }
]

export const direction = [
  { text: 'ASC', value: 'asc' },
  { text: 'DESC', value: 'desc' }
]

export const aggregationTypes = {
  sum: 1,
  count: 2,
  avg: 3,
  min: 4,
  max: 5,
  currency: 6,
  percent: 7,
  distinct: 8
}

export const productCategory = {
  nets: 'N',
  twine: 'T',
  completed: 'P'
}

export const freghtRate = {
  container: 'C',
  weight: 'W'
}

export const tradeTerm = {
  FOB: 'FOB',
  CAF: 'CAF',
  CIF: 'CIF'
}

export const deliveryType = {
  lot: 'L',
  compile: 'C'
}

export const customerType = {
  foreign: 1,
  domestic: 2,
  notax: 3
}

export const remarkGroupType = {
  Document: 'D',
  CommissionApproved: 'C',
  PromotionApproved: 'M',
  QuotationApproved: 'Q',
  OrderApproved: 'O'
}

export const statusFlagGroupType = {
  Approval: 'A',
  Document: 'D'
}

export const documentStatus = {
  WorkInProgress: 'W',
  PendingForApproval: 'P',
  Approved: 'A',
  NotApproved: 'N',
  PendingForNext: 'I',
  Success: 'S'
}

export const document = {
  quotation: 'Q',
  proformaInvoice: 'P',
  Order: 'O'
}

export const documentStatusIcon = {
  WorkInProgress: 'spinner',
  PendingForApproval: 'hourglass-half',
  Approved: 'check-square',
  NotApproved: 'info-circle',
  PendingForNext: 'share-square',
  Success: 'flag-checkered'
}

export const notifyGroupType = {
  QM: '/sales/quotation/manage',
  QA: '/sales/quotation/approval',
  PM: '/sales/proformainvoice/manage',
  MM: '/setup/commission/manage',
  MA: '/setup/commission/approval',
  TM: '/setup/promotion/manage',
  TA: '/setup/promotion/approval',
  OM: '/sales/order/manage',
  OA: '/sales/order/approval',
  RD: '/report/accounting/ordertrackingdepositreport'
}

export const table = {
  sxsPromotionDetail: 1,
  sxsCommissionValue: 2,
  sxtQuotationItems: 3,
  sxtOrderMain: 5
}

export const updateFlag = {
  Add: 'A',
  Modify: 'M',
  Clone: 'C',
  Any: 'O',
  Normal: 'N',
  Special: 'S'
}

export const actionFlag = {
  Operate: 'O',
  NotApproved: 'N',
  Approved: 'A'
}

export const qtVariable = {
  companyName: 'KHON KAEN FISHING NET FACTORY CO.,LTD',
  companyAddress: 'ADDRESS: 115 MITRAPARB HIGHWAY KHONKAEN 40000 THAILAND',
  companyTel: 'TEL: 66-43-221 880-5 | FAX: 66-43-221 879',
  companyContact: 'www.kkfnets.com | sales@kkfnets.com',
  docTitle: 'QUOTATION',
  refLabel: 'Ref:',
  billToLabel: 'Bill To:',
  dateLabel: 'Date:',
  salesContactLabel: 'Sales Contact:',
  emailLabel: 'Email:',
  paymentTermLabel: 'Payment Terms:',
  tradeTermsLabel: 'Trade Terms:',

  itemLabel: 'Item',
  noLabel: 'No.',
  descriptionLabel: 'Description',
  quantityLabel: 'Quantity',
  salesLabel: 'Sales',
  unitLabel: 'Unit',
  unitPriceLabel: 'Unit Price',
  amountLabel: 'Amount',

  packageOfProductLabel: 'Package of product:',
  itemsLabel: 'Items',
  labelbageLabel: 'Label / Bag',
  labelLabel: 'Label:',
  bagLabel: 'Bag:',

  subTotalLabel: 'Sub Total',
  specialDiscountLabel: 'Special Discount',
  commissionLabel: 'Commission',
  totalLabel: 'Total',

  conditionAndNoteLabel: 'Condition & Note:',
  customerSignatureLabel: 'Customer Signature',
  dateSignLabel: 'Date:......................................',

  pageLabel: 'Page'
}

export const piVariable = {
  companyName: 'KHON KAEN FISHING NET FACTORY CO.,LTD',
  companyAddress1: 'ADDRESS: 115 MITRAPARB HIGHWAY KHONKAEN',
  companyAddress2: '40000 THAILAND',
  companyTel: 'Tel: 66-43-221 880-5',
  companyFax: 'Fax: 66-43-221 879',
  companyContact1: 'www.kkfnets.com',
  companyContact2: 'Email: sales@kkfnets.com',
  docTitle: 'PROFORMA INVOICE',
  subTitle: 'Invoice No.',
  dummyText1: 'KPI-20080001',
  dummyText2: 'Ref: KQT-20080001',
  billTo: 'BILL TO :',
  salesContactLabel: 'Sales Contact :',
  paymentTermLabel: 'Payment Terms :',
  tradeTermsLabel: 'Trade Terms :',
  placeOfReceiptLabel: 'Place Of Receipt :',
  shippingMarkLabel: 'Shipping Mark :',
  invoiceDateLabel: 'Invoice Date',
  admitDateLabel: 'Admit Date',

  itemLabel: 'Item',
  noLabel: 'No.',
  descriptionLabel: 'Description',
  quantityLabel: 'Quantity',
  salesLabel: 'Sales',
  unitLabel: 'Unit',
  unitPriceLabel: 'Unit Price',
  amountLabel: 'Amount',

  packageOfProductLabel: 'Package of product:',
  itemsLabel: 'Items',
  labelbageLabel: 'Label / Bag',
  labelLabel: 'Label:',
  bagLabel: 'Bag:',

  subTotalLabel: 'Sub Total',
  specialDiscountLabel: 'Special Discount',
  commissionLabel: 'Commission',
  totalLabel: 'Total',

  conditionAndNoteLabel: 'Condition & Note:',
  customerSignatureLabel: 'Customer Signature',
  dateSignLabel: 'Date:.............................',

  pageLabel: 'Page'
}

export const RunningOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'ก', 'ข', 'ค', 'ฆ', 'ง', 'จ', 'ฉ', 'ช',
  'ซ', 'ฌ', 'ญ', 'ฎ', 'ฏ', 'ฐ', 'ฑ', 'ฒ', 'ณ', 'ด',
  'ต', 'ถ', 'ท', 'ธ', 'น', 'บ', 'ป', 'ผ', 'ฝ', 'พ',
  'ฟ', 'ภ', 'ม', 'ย', 'ร', 'ล', 'ว', 'ศ', 'ษ', 'ส',
  'ห', 'ฬ', 'อ', 'ฮ', '!', '#', '$', '(', ')', '*', '+', '-', '/', '[', '\\', ']', '{', '|', '}', '<', '=', '>', '?', '@', ':', ';', '&', 'ฯ', 'า', 'เ', 'แ', 'โ', 'ใ', 'ไ', 'ๆ']

export const specialChar = {
  L008: 'V',
  L026: 'Z',
  L104: 'X',
  L108: 'X',
  L110: 'X',
  L202: 'V',
  L340: 'Z',
  L408: 'Z',
  L5i7: 'V',
  L519: 'V',
  L520: 'Z',
  L530: 'V',
  L531: 'Z',
  L535: 'Z',
  L536: 'X',
  L540: 'Z',
  L555: 'Z',
  L557: 'X',
  L603: 'X',
  L604: 'X',
  L606: 'X',
  L714: 'Z',
  L802: 'V',
  L803: 'Z',
  L804: 'X'
}
