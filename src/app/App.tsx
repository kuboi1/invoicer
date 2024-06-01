import { FieldValues } from "react-hook-form"
import InvoiceForm from "./components/forms/InvoiceForm"

const App = () => {
  
  const invoiceFormOnSubmit = (values: FieldValues) => {
    console.log(values)
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
            m-5 p-10 bg-zinc-800 rounded-md border border-white
            w-4/5 md:w-3/4 lg:w-2/3
          '
        >
          <InvoiceForm onSubmit={invoiceFormOnSubmit} />
        </div>
      </section>
    </>
  )
}

export default App
