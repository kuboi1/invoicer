import { FieldValues, useForm } from 'react-hook-form';
import TextInput from './inputs/TextInput';
import SubmitButton from './inputs/SubmitButton';

enum Input {
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

interface InvoiceFormProps {
    onSubmit: (values: FieldValues) => void
}

const InvoiceForm = (props: InvoiceFormProps) => {
    const { onSubmit } = props

    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-8'
        >
            <div
                className='w-full space-y-8'
            >
                <div className='space-y-4'>
                    <h2>Payer</h2>

                    <div className='space-y-2'>
                        <h3>Company</h3>
                        <div
                            className='grid sm:grid-cols-2 gap-3'
                        >
                            <TextInput 
                                register={register}
                                name={Input.Name}
                                label='Name'
                                required={true}
                                errors={errors}
                                className='sm:col-span-full'
                            />
                            <TextInput 
                                register={register}
                                name={Input.CIN}
                                label='CIN'
                                required={true}
                                errors={errors}
                            />
                            <TextInput 
                                register={register}
                                name={Input.VAT}
                                label='VAT ID'
                                required={true}
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <h3>Address</h3>
                        <div
                            className='grid md:grid-cols-3 gap-3'
                        >
                            <TextInput 
                                register={register}
                                name={Input.Street}
                                label='Street'
                                required={true}
                                errors={errors}
                                className='col-span-full'
                            />
                            <TextInput 
                                register={register}
                                name={Input.City}
                                label='City'
                                required={true}
                                errors={errors}
                                className='md:col-span-2'
                            />
                            <TextInput 
                                register={register}
                                name={Input.ZIP}
                                label='ZIP code'
                                required={true}
                                errors={errors}
                            />
                        </div>
                    </div>
                </div>

                <div className='space-y-4'>
                    <h2>Work Done</h2>

                    <div
                        className='grid grid-cols-2 gap-3'
                    >
                        <TextInput 
                            register={register}
                            name={Input.WorkLabel}
                            label='Label'
                            required={true}
                            errors={errors}
                            className='col-span-full'
                        />
                        <TextInput 
                            register={register}
                            name={Input.Rate}
                            label='Rate CZK/hr'
                            required={true}
                            errors={errors}
                        />
                        <TextInput 
                            register={register}
                            name={Input.Hours}
                            label='Hours Worked'
                            required={true}
                            errors={errors}
                        />
                        <TextInput 
                            register={register}
                            name={Input.ExtraIncome}
                            label='Extra Income'
                            required={true}
                            errors={errors}
                        />
                        <TextInput 
                            register={register}
                            name={Input.Expenses}
                            label='Expenses'
                            required={true}
                            errors={errors}
                        />
                    </div>  
                </div>

                <div className='space-y-4'>
                    <h2>Extra Info</h2>

                    <TextInput 
                        register={register}
                        name={Input.ContractInfo}
                        label='Contract Info'
                        errors={errors}
                        className='w-full'
                    />
                </div>

            </div>

            <SubmitButton text='Submit' />
        </form>
    )
}

export default InvoiceForm