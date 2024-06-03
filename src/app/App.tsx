import { FieldValues } from "react-hook-form"
import InvoiceForm from "./components/forms/InvoiceForm"
import { InvoiceFormValues } from "./types/components/FormTypes"
import { InvoiceValues, UserData } from "./types/components/InvoiceTypes"
import { useState } from "react"
import userDataJson from "../assets/data/user.json"
import InvoiceService from "./services/InvoiceService"
import InvoiceView from "./components/InvoiceView"

const App = () => {
    const [invoiceValues, setInvoiceValues] = useState<InvoiceValues|null>(null)

    const userData: UserData = userDataJson as UserData

    const invoiceFormOnSubmit = (values: FieldValues) => {
        setInvoiceValues(
            InvoiceService.createInvoiceValues(values as InvoiceFormValues, userData)
        )
    }

    return (
        <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-10'>
            <div
                className='container lg:col-span-4 flex-grow'
            >
                <InvoiceForm onSubmit={invoiceFormOnSubmit} />
            </div>
            <div
                className='container space-y-8 lg:col-span-6 flex-grow'
            >
                <InvoiceView invoiceData={invoiceValues} userData={userData} />
            </div>
        </div>
    )
}

export default App
