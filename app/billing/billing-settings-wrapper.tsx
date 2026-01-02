import { BillingAddressCard } from "@/features/billing/components/billing-address-card";
import { CurrencyPreferenceCard } from "@/features/billing/components/currency-preference-card";
import { InvoiceRecipientsCard } from "@/features/billing/components/invoice-recipients-card";
import { TaxInfoCard } from "@/features/billing/components/tax-info-card";
import {
  availableCurrencies,
  BillingAddress,
  CurrencyPreference,
  InvoiceRecipient,
  TaxInfo,
} from "@/interfaces/billing-settings";
import { useState } from "react";
import { toast } from "sonner";

const BillingSettingsWrapper = () => {
  const [billingAddress, setBillingAddress] = useState<BillingAddress | null>(
    null
  );
  const [taxInfo, setTaxInfo] = useState<TaxInfo | null>(null);
  const [invoiceRecipients, setInvoiceRecipients] = useState<
    InvoiceRecipient[]
  >([
    {
      id: "1",
      email: "billing@company.com",
      name: "Billing Team",
      isPrimary: true,
    },
  ]);

  const [currency, setCurrency] = useState<CurrencyPreference>(
    availableCurrencies[0]
  );

  const handleAddRecipient = (recipient: InvoiceRecipient) => {
    setInvoiceRecipients((prev) => [...prev, recipient]);
    toast.success("Recipient added");
  };

  const handleRemoveRecipient = (id: string) => {
    setInvoiceRecipients((prev) => prev.filter((r) => r.id !== id));
    toast.success("Recipient removed");
  };

  const handleSetPrimaryRecipient = (id: string) => {
    setInvoiceRecipients((prev) =>
      prev.map((r) => ({ ...r, isPrimary: r.id === id }))
    );
    toast.success("Primary recipient updated");
  };
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <BillingAddressCard
        address={billingAddress}
        onSave={(address) => {
          setBillingAddress(address);
          toast.success("Billing address saved");
        }}
      />
      <TaxInfoCard
        taxInfo={taxInfo}
        onSave={(info) => {
          setTaxInfo(info);
          toast.success("Tax information saved");
        }}
      />
      <InvoiceRecipientsCard
        recipients={invoiceRecipients}
        onAdd={handleAddRecipient}
        onRemove={handleRemoveRecipient}
        onSetPrimary={handleSetPrimaryRecipient}
      />
      <CurrencyPreferenceCard
        currency={currency}
        onChange={(curr) => {
          setCurrency(curr);
          toast.success(`Currency changed to ${curr.name}`);
        }}
      />
    </div>
  );
};

export default BillingSettingsWrapper;
