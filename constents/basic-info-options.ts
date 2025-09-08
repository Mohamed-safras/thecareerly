import { SelectFieldOptions } from "@/types/common";

export const EMPLOYMENT_TYPES: Readonly<SelectFieldOptions[]> = Object.freeze([
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
  { value: "Other", label: "Other" },
]);

export const JOB_SENIORITY: Readonly<SelectFieldOptions[]> = Object.freeze([
  { value: "Intern", label: "Intern" },
  { value: "Junior", label: "Junior" },
  { value: "Associate", label: "Associate" },
  { value: "MidLevel", label: "Mid Level" },
  { value: "Senior", label: "Senior" },
  { value: "Lead", label: "Lead" },
  { value: "Manager", label: "Manager" },
  { value: "SeniorManager", label: "Senior Manager" },
  { value: "Director", label: "Director" },
  { value: "SeniorDirector", label: "Senior Director" },
  { value: "AVP", label: "Assistant Vice President" },
  { value: "VP", label: "Vice President" },
  { value: "SVP", label: "Senior Vice President" },
  { value: "EVP", label: "Executive Vice President" },
  { value: "CLevel", label: "C-Level" },
  { value: "President", label: "President" },
  { value: "MD", label: "Managing Director" },
  { value: "Chairman", label: "Chairman" },
]);

export const FACILITY_OPTIONS = Object.freeze([
  { value: "bonus", label: "Bonus" },
  { value: "comission", label: "Comission" },
  { value: "paid-overtime", label: "Paid Overtime" },
  { value: "medical-cover", label: "Medical Cover" },
  { value: "dental-care", label: "Dental Care" },
  { value: "life-insurance", label: "Life Insurance" },
  { value: "eye-care", label: "Eye Care" },
  { value: "company-car", label: "Company Car" },
  { value: "traval-expenses", label: "Traval Expenses" },
  { value: "share-plan", label: "Share Plan" },
  { value: "flexible-working-hours", label: "Flexible Working Hours" },
  { value: "car-allowance", label: "Car Allowance" },
  { value: "subsidised-food", label: "Subsidised Food" },
  { value: "shipping/retail-discount", label: "Shipping/Retail Discount" },
  { value: "gym-membership", label: "Gym Membership" },
  { value: "education-assistance", label: "Education Assistance" },
  { value: "pension-plan", label: "Pension Plan" },
] as const);

export const ALLOWED_VIBES_TYPES: Readonly<SelectFieldOptions[]> =
  Object.freeze([
    { value: "professional", label: "Professional" },
    { value: "modern", label: "Modern" },
    { value: "minimal", label: "Minimal" },
    { value: "vibrant", label: "Vibrant" },
  ]);

export const WORK_PREFERENCE: Readonly<SelectFieldOptions[]> = Object.freeze([
  { value: "Onsite", label: "Onsite" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Remote", label: "Remote" },
]);

export const QUALIFICATION_LEVEL: Readonly<SelectFieldOptions[]> =
  Object.freeze([
    { value: "High School / O-Levels", label: "High School / O-Levels" },
    {
      value: "Vocational / Technical Training",
      label: "Vocational / Technical Training",
    },
    {
      value: "Diploma / Advanced Diploma",
      label: "Diploma / Advanced Diploma",
    },
    { value: "Associate Degree", label: "Associate Degree" },
    { value: "Bachelor’s Degree", label: "Bachelor’s Degree" },
    { value: "Master’s Degree", label: "Master’s Degree" },
    { value: "Doctorate / PhD", label: "Doctorate / PhD" },
    { value: "Post Doctorate", label: "Post Doctorate" },
    {
      value: "Professional Certification / License",
      label: "Professional Certification / License",
    },
    {
      value: "Bootcamp / Short Course Certification",
      label: "Bootcamp / Short Course Certification",
    },
  ]);

export const PAY_PERIOD: Readonly<SelectFieldOptions[]> = Object.freeze([
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Annually", label: "Annually" },
]);
export const CURRENCY_OPTIONS: Readonly<SelectFieldOptions[]> = Object.freeze([
  { value: "LKR", label: "LKR - Sri Lankan Rupee" },
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "SGD", label: "SGD - Singapore Dollar" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "CNY", label: "CNY - Chinese Yuan" },
  { value: "CHF", label: "CHF - Swiss Franc" },
  { value: "HKD", label: "HKD - Hong Kong Dollar" },
  { value: "NZD", label: "NZD - New Zealand Dollar" },
  { value: "ZAR", label: "ZAR - South African Rand" },
  { value: "MYR", label: "MYR - Malaysian Ringgit" },
  { value: "PHP", label: "PHP - Philippine Peso" },
  { value: "IDR", label: "IDR - Indonesian Rupiah" },
  { value: "THB", label: "THB - Thai Baht" },
  { value: "VND", label: "VND - Vietnamese Dong" },
  { value: "KRW", label: "KRW - South Korean Won" },
  { value: "TRY", label: "TRY - Turkish Lira" },
  { value: "BRL", label: "BRL - Brazilian Real" },
  { value: "MXN", label: "MXN - Mexican Peso" },
  { value: "RUB", label: "RUB - Russian Ruble" },
  { value: "AED", label: "AED - UAE Dirham" },
  { value: "SAR", label: "SAR - Saudi Riyal" },
]);
