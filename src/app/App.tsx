import { FieldValues } from "react-hook-form"
import InvoiceForm from "./components/forms/InvoiceForm"
import { InvoiceFormInput, InvoiceFormValues } from "./types/components/FormTypes"
import { InvoiceValues } from "./types/components/InvoiceTypes"

const App = () => {
  const parseInvoiceValues = (formValues: InvoiceFormValues) => {
    const invoiceValues: InvoiceValues = {
      company: {
        name: formValues[InvoiceFormInput.Name],
        cin: formValues[InvoiceFormInput.CIN],
        vat: formValues[InvoiceFormInput.VAT],
        address: {
          city: formValues[InvoiceFormInput.City],
          street: formValues[InvoiceFormInput.Street],
          zip: formValues[InvoiceFormInput.ZIP],
        }
      },
      work: {
        price: calculateInvoicePrice(
          Number(formValues[InvoiceFormInput.Rate]),
          Number(formValues[InvoiceFormInput.Hours]),
          Number(formValues[InvoiceFormInput.ExtraIncome]),
          Number(formValues[InvoiceFormInput.Expenses])
        ),
        label: formValues[InvoiceFormInput.WorkLabel]
      },
      extra: {
        contractInfo: formValues[InvoiceFormInput.ContractInfo]
      }
    }

    return invoiceValues
  }

  const calculateInvoicePrice = (rate: number, hoursWorked: number, extraIncome: number, expenses: number) => {
    return (rate * hoursWorked) + extraIncome - expenses
  }

  const invoiceFormOnSubmit = (values: FieldValues) => {
    console.log(parseInvoiceValues(values as InvoiceFormValues))
  }

  return (
    <>
      <section
        className='flex flex-col items-center'
      >
        <h1>
          Invoicer
        </h1>
        <div
          className='
            m-1 md:m-5 p-4 md:p-10 bg-zinc-800 rounded-md border border-white
            w-5/6 md:w-3/4 lg:w-2/3
          '
        >
          <InvoiceForm onSubmit={invoiceFormOnSubmit} />
        </div>
      </section>
    </>
  )
}

export default App
