export interface BillingAddress {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface TaxInfo {
  taxId?: string;
  taxIdType?: "vat" | "gst" | "ein" | "other";
  businessName?: string;
  isExempt: boolean;
}

export interface InvoiceRecipient {
  id: string;
  email: string;
  name?: string;
  isPrimary: boolean;
}

export interface CurrencyPreference {
  code: string;
  symbol: string;
  name: string;
}

export const availableCurrencies: CurrencyPreference[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
];
