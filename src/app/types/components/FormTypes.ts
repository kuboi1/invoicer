import { Control, FieldErrors, FieldValues, UseFormRegister, UseFormReset, UseFormSetValue } from "react-hook-form";

export enum InputType {
    Text,
    Int,
    Float,
    Email
}

export interface InputControls {
    control: Control<FieldValues>,
    register: UseFormRegister<FieldValues>,
    reset: UseFormReset<FieldValues>,
    setValue: UseFormSetValue<FieldValues>,
    errors: FieldErrors<FieldValues>
}

export enum InvoiceFormInput {
    Name = 'name',
    CIN = 'cin',
    VAT = 'vat',
    Street = 'street',
    City = 'city',
    ZIP = 'zip',
    Rate = 'rate',
    Hours = 'hours',
    ExtraIncome = 'extra_income',
    Expenses = 'expenses',
    WorkLabel = 'work_label',
    ContractInfo = 'contract_info'
}

export interface InvoiceFormValues {
    [InvoiceFormInput.Name]: string,
    [InvoiceFormInput.CIN]: string,
    [InvoiceFormInput.VAT]: string,
    [InvoiceFormInput.Street]: string,
    [InvoiceFormInput.City]: string,
    [InvoiceFormInput.ZIP]: string,
    [InvoiceFormInput.Rate]: string,
    [InvoiceFormInput.Hours]: string,
    [InvoiceFormInput.ExtraIncome]: string,
    [InvoiceFormInput.Expenses]: string,
    [InvoiceFormInput.WorkLabel]: string,
    [InvoiceFormInput.ContractInfo]: string
}