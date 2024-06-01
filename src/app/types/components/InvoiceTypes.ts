
export interface InvoiceValues {
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
        contractInfo: string
    }
}