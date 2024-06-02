import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { InvoiceValues, UserData } from '../types/components/InvoiceTypes';
import RobotoRegular from '../../assets/font/Roboto-Regular.ttf'
import RobotoBold from '../../assets/font/Roboto-Bold.ttf'
import QRCode from 'qrcode'

interface PDFInvoiceProps {
    invoiceData: InvoiceValues,
    userData: UserData
}

// Create Document Component
const PDFInvoice = (props: PDFInvoiceProps) => {
    const { invoiceData, userData } = props

    const generateQRCodeDataURL = async (value: string) => {
        try {
            const qrCodeDataURL = await QRCode.toDataURL(value)
            return qrCodeDataURL
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    }

    Font.register({
        family: 'Roboto',
        fonts: [
            { src: RobotoRegular, fontWeight: 'normal' },
            { src: RobotoBold, fontWeight: 'bold' },
        ],
    })

    // Create styles
    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Roboto',
            fontSize: 11,
            padding: 50
        },
        title: {
            fontSize: 24
        },
        header: {
            fontSize: 20
        },
        section: {
            marginVertical: 10
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20
        },
        column: {
            width: '45%',
        },
        textBold: {
            fontWeight: 'bold'
        },
        labelValueRowFull: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        labelValueRow: {
            width: '66%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            textAlign: 'left'
        },
        contractInfo: {
            fontSize: 12,
            marginTop: 25,
            marginBottom: 10
        },
        priceLabel: {
            margin: 2
        },
        priceRow: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            padding: 2
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 40
        },
        finalPrice: {
            width: '50%',
            textAlign: 'right',
            borderTop: '1px solid black',
            paddingTop: 5,
            paddingRight: 2,
            fontSize: 20
        },
        qrCode: {
            width: 170,
            height: 170,
            marginLeft: -16,
            marginTop: -16
        },
        qrLabel: {
            marginTop: -10
        },
        bottomText: {
            position: 'absolute',
            left: 50,
            bottom: 50
        }
    })

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.row}>
                    <View style={styles.column}></View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Faktura</Text>
                        <Text style={styles.header}>{invoiceData.number}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Dodavatel</Text>
                    </View>
                    <View style={styles.column}>
                        <Text>Odběratel</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>{userData.name}</Text>
                        <Text>{userData.address.street}</Text>
                        <Text>{userData.address.zip} {userData.address.city}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text>{invoiceData.company.name}</Text>
                        <Text>{invoiceData.company.address.street}</Text>
                        <Text>{invoiceData.company.address.zip} {invoiceData.company.address.city}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <View style={styles.labelValueRow}>
                            <Text>IČ</Text>
                            <Text>{userData.cin}</Text>
                        </View>
                        <Text>Neplátce DPH</Text>
                    </View>
                    <View style={styles.column}>
                        <View style={styles.labelValueRow}>
                            <Text>IČ</Text>
                            <Text>{invoiceData.company.cin}</Text>
                        </View>
                        <View style={styles.labelValueRow}>
                            <Text>DIČ</Text>
                            <Text>{invoiceData.company.vat}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <View style={styles.labelValueRowFull}>
                            <Text>Bankovní účet</Text>
                            <Text>{userData.bankAcc}</Text>
                        </View>
                        <View style={styles.labelValueRowFull}>
                            <Text>Variabilní symbol</Text>
                            <Text>{invoiceData.variableSymbol}</Text>
                        </View>
                        <View style={styles.labelValueRowFull}>
                            <Text>Způsob platby</Text>
                            <Text>Převodem</Text>
                        </View>
                    </View>
                    <View style={styles.column}>
                        <View style={styles.labelValueRowFull}>
                            <Text>Datum vystavení</Text>
                            <Text>{invoiceData.issueDate.format('DD.MM.YYYY')}</Text>
                        </View>
                        <View style={styles.labelValueRowFull}>
                            <Text>Datum splatnosti</Text>
                            <Text>{invoiceData.dueDate.format('DD.MM.YYYY')}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.contractInfo}>{invoiceData.extra.contractInfo}</Text>

                <View style={styles.labelValueRowFull}>
                    <Text></Text>
                    <Text style={styles.priceLabel}>Cena</Text>
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.textBold}>{invoiceData.work.label}</Text>
                    <Text>
                        {invoiceData.work.price.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <View style={styles.column}>
                        <Image style={styles.qrCode} src={async () => await generateQRCodeDataURL(invoiceData.extra.qrPayment)} />
                        <Text style={styles.qrLabel}>QR platba</Text>
                    </View>
                    <Text style={styles.finalPrice}>
                        {invoiceData.work.price.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}
                    </Text>
                </View>

                <Text style={styles.bottomText}>
                    Fyzická osoba zapsaná v živnostenském rejstříku
                </Text>
            </Page>
        </Document>
    )
}

export default PDFInvoice
