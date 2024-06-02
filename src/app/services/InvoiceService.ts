import { Moment } from "moment"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/cs'
import { InvoiceFormInput, InvoiceFormValues } from "../types/components/FormTypes"
import { InvoiceValues, UserData } from "../types/components/InvoiceTypes"


export default class InvoiceService {

    public static createInvoiceValues(formValues: InvoiceFormValues, userData: UserData) {
        const price = InvoiceService.calculateInvoicePrice(
            Number(formValues[InvoiceFormInput.Rate]),
            Number(formValues[InvoiceFormInput.Hours]),
            Number(formValues[InvoiceFormInput.ExtraIncome]),
            Number(formValues[InvoiceFormInput.Expenses])
        )

        const invoiceNumber = InvoiceService.generateInvoiceNumber()

        const dueDate = moment().add(1, 'months').startOf('month') // First day of next month

        const invoiceValues: InvoiceValues = {
          number: invoiceNumber,
          variableSymbol: InvoiceService.getVariableSymbol(invoiceNumber),
          issueDate: moment(), // Now
          dueDate: dueDate,
          fileName: InvoiceService.generateFileName(invoiceNumber, userData.name.split(' ')[1]),
    
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
            price: price,
            label: formValues[InvoiceFormInput.WorkLabel]
          },
    
          extra: {
            contractInfo: formValues[InvoiceFormInput.ContractInfo],
            qrPayment: InvoiceService.generateQrPayment(invoiceNumber, userData.bankAcc, price, dueDate)
          }
        }
    
        return invoiceValues
    }

    private static calculateInvoicePrice(rate: number, hoursWorked: number, extraIncome: number, expenses: number) {
        return (rate * hoursWorked) + extraIncome - expenses
    }

    private static generateQrPayment(invoiceNumber: string, bankAcc: string, price: number, dueDate: Moment) {
        return `SPD*1.0*ACC:${InvoiceService.calculateIban(bankAcc)}*AM:${price.toFixed(2)}*CC:CZK*X-VS:${InvoiceService.getVariableSymbol(invoiceNumber)}*DT:${dueDate.format('YYYYMMDD')}`
    }

    private static generateInvoiceNumber() {
        // Get the current year
        const year = moment().format('YYYY')

        // Get the current month with 2 digits
        const month = moment().format('MM')

        // Combine the year and month in the desired format
        return `${year}-00${month}`
    }

    private static getVariableSymbol(invoiceNumber: string) {
        return invoiceNumber.replace('-', '')
    }

    private static generateFileName(invoiceNumber: string, userName: string) {
      // Set moment locale to cs
      moment.locale('cs')

      const month = moment().subtract(1, 'month').format('MMMM').toLowerCase()

      return `Faktura${invoiceNumber}_${month}_${userName}.pdf`
    }

    private static calculateIban(bankAcc: string) {
        const accountNumber = bankAcc.split('/')[0]
        const bankCode = bankAcc.split('/')[1]

        // Calculate check digits using the MOD-97-10 algorithm
        const mod97 = (number: string) => {
            let m = 0
            for (let i = 0; i < number.length; ++i) {
                m = ((m * 10) + parseInt(number.charAt(i), 10)) % 97
            }
            return m
        }

        let paddedAccountNumber = accountNumber.padStart(16, '0')
        let paddedBankCode = bankCode.padStart(4, '0')
        let combined = `${paddedBankCode}${paddedAccountNumber}123500`
        
        // Calculate checksum
        var checksum = 98 - mod97(combined)
        let checksumStr = checksum.toString().padStart(2, '0')

        return `CZ${checksumStr}${paddedBankCode}${paddedAccountNumber}`
    }
}