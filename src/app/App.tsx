import { FieldValues } from "react-hook-form"
import InvoiceForm from "./components/forms/InvoiceForm"
import { InvoiceFormValues } from "./types/components/FormTypes"
import { InvoiceValues, UserData } from "./types/components/InvoiceTypes"
import { useState } from "react"
import PDFInvoice from "./components/PDFInvoice"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import userDataJson from "../assets/data/user.json"
import InvoiceService from "./services/InvoiceService"

const App = () => {
  const [invoiceValues, setInvoiceValues] = useState<InvoiceValues|null>(null)

  const userData: UserData = userDataJson as UserData

  const invoiceFormOnSubmit = (values: FieldValues) => {
    console.log(InvoiceService.createInvoiceValues(values as InvoiceFormValues, userData))
    setInvoiceValues(
      InvoiceService.createInvoiceValues(values as InvoiceFormValues, userData)
    )
  }

  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-10'>
          <div
            className='
              p-4 md:p-10 bg-zinc-800 rounded-md border border-white w-full
              lg:col-span-4
            '
          >
            <InvoiceForm onSubmit={invoiceFormOnSubmit} />
          </div>
          <div
            className='
              p-4 md:p-10 bg-zinc-800 rounded-md border border-white w-full space-y-8
              lg:col-span-6 hidden md:block
            '
          >
            {invoiceValues ? (
              <>
                <PDFDownloadLink 
                  document={<PDFInvoice invoiceData={invoiceValues} userData={userData} />} 
                  fileName={invoiceValues.fileName}
                >
                  
                  {({ loading }) => (
                      <span
                        className={`
                          block text-center w-full p-3
                          ${loading ? 'bg-zinc-500' : 'bg-blue-400 rounded-md hover:bg-blue-500 transition-colors'}
                        `}
                      >
                        {loading ? 'Loading document...' : 'Download'}
                      </span>
                    )
                  }
                </PDFDownloadLink>
                <PDFViewer
                  className='overflow-scroll'
                  width='100%'
                  height='1000px'
                  showToolbar={false}
                >
                  <PDFInvoice 
                    invoiceData={invoiceValues} 
                    userData={userDataJson as UserData}
                  />
                </PDFViewer>
              </>
            ) : (
              <span>Once you generate an invoice, a preview of it will be shown here.</span>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default App
