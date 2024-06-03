import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import PDFInvoice from "./PDFInvoice"
import { InvoiceValues, UserData } from "../types/components/InvoiceTypes"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch, faFileArrowDown } from "@fortawesome/free-solid-svg-icons"
import Overlay from "./Overlay"

interface InvoiceViewProps {
    invoiceData: InvoiceValues|null,
    userData: UserData
}

const InvoiceView = (props: InvoiceViewProps) => {
    const { invoiceData, userData } = props

    const [docLoading, setDocLoading] = useState<boolean>(true)

    useEffect(() => {
        setDocLoading(true)
    }, [invoiceData, userData])

    return (
        <div
            className='relative flex flex-col gap-2 w-full h-full'
        >
            {invoiceData ? (
                <>
                    {docLoading && (
                        <Overlay>
                            <FontAwesomeIcon icon={faCircleNotch} className='w-16 h-16 lg:w-32 lg:h-32 opacity-50 animate-spin' />
                        </Overlay>
                    )}
                    <PDFDownloadLink 
                        document={<PDFInvoice invoiceData={invoiceData} userData={userData} />} 
                        fileName={invoiceData.fileName}
                    >
                        {({ loading }) => {
                            useEffect(() => {
                                if (!loading) {
                                    // Give a bit of time to the PDFViewer to load
                                    const timer = setTimeout(() => {
                                        setDocLoading(false)
                                    }, 250)
                                    return () => clearTimeout(timer)
                                }
                            }, [loading]);

                            return docLoading ? (
                                <></>
                            ) : (
                                <span
                                    className='button-primary flex items-center space-x-2'
                                >
                                    <span>Download</span>
                                    <FontAwesomeIcon icon={faFileArrowDown} className='w-5 h-5' />
                                </span>
                            )
                        }}
                    </PDFDownloadLink>
                    <div className='flex-grow hidden md:block'>
                        <PDFViewer
                            className='block w-full h-full overflow-scroll'
                            showToolbar={false}
                        >
                            <PDFInvoice 
                                invoiceData={invoiceData} 
                                userData={userData}
                            />
                        </PDFViewer>
                    </div>
                </>
                ) : (
                    <Overlay>
                        <span className='text-2xl text-center hidden md:block'>
                            Once you generate an invoice, a&nbsp;preview of it will be displayed here.
                        </span>
                        <span className='text-xl text-center block md:hidden'>
                            Once you generate an invoice, you will be able to download it here.
                        </span>
                    </Overlay>
                )
            }
        </div>
    )
}

export default InvoiceView