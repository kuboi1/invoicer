import { Moment } from "moment"

export interface InvoiceValues {
    number: string,
    variableSymbol: string,
    issueDate: Moment,
    dueDate: Moment,
    fileName: string,
    company: {
        name: string,
        cin: string,
        vat: string,
        address: {
            city: string,
            street: string,
            zip: string
        }
    },
    work: {
        label: string,
        price: number
    },
    extra: {
        contractInfo: string,
        qrPayment: string
    }
}

export interface UserData {
    name: string,
    cin: string,
    vat: string|null,
    bankAcc: string,
    address: {
        city: string,
        street: string,
        zip: string
    }
}