import { FieldValues, useForm } from 'react-hook-form';
import SubmitButton from './inputs/SubmitButton';
import PresetManager from '../../model/PresetManager';
import { useState } from 'react';
import TextAreaInput from './inputs/TextAreaInput';
import { InputControls, InputType, InvoiceFormInput, InvoiceFormValues } from '../../types/components/FormTypes';
import TextInput from './inputs/TextInput';
import FormPreset from '../FormPreset';

interface InvoiceFormProps {
    onSubmit: (values: FieldValues) => void
}

const InvoiceForm = (props: InvoiceFormProps) => {
    const { onSubmit } = props

    const presetManager = new PresetManager()

    const defaultFormValues: InvoiceFormValues = {
        [InvoiceFormInput.Name]: '',
        [InvoiceFormInput.CIN]: '',
        [InvoiceFormInput.VAT]: '',
        [InvoiceFormInput.Street]: '',
        [InvoiceFormInput.City]: '',
        [InvoiceFormInput.ZIP]: '',
        [InvoiceFormInput.Rate]: '',
        [InvoiceFormInput.Hours]: '',
        [InvoiceFormInput.ExtraIncome]: '',
        [InvoiceFormInput.Expenses]: '',
        [InvoiceFormInput.WorkLabel]: '',
        [InvoiceFormInput.ContractInfo]: ''
    }

    const [selectedPreset, setSelectedPreset] = useState<string|null>(null)

    const { control, register, reset, setValue, setFocus, handleSubmit, formState: { errors } } = useForm({
        defaultValues: presetManager.getPresetValues(selectedPreset) as FieldValues
    })

    const inputControls: InputControls = {
        control,
        register,
        reset,
        setValue,
        errors
    }

    const onPresetClick = (key: string) => {
        if (selectedPreset === key) {
            setSelectedPreset(null)
            reset(defaultFormValues)
        } else {
            setSelectedPreset(key)
            reset(presetManager.getPresetValues(key) as FieldValues)
            // Focus the hours worked input after a short delay
            setTimeout(() => {
                setFocus(InvoiceFormInput.Hours);
            }, 0.1)
        }
    }

    const formatZipCode = (value: string) => {
        // Format the ZIP code to "123 45"
        if (value.length > 3) {
            value = value.slice(0, 3) + ' ' + value.slice(3, 5)
        }
        
        return value
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-8'
        >
            <div
                className='pb-4 border-b space-y-4'
            >
                <h2>Presets</h2>

                <div>
                    {presetManager.getPresetKeys().map((key: string) => (
                        <FormPreset 
                            key={key}
                            name={key} 
                            color={presetManager.getPresetColor(key)}
                            isFocused={key === selectedPreset} 
                            onClick={() => onPresetClick(key)} 
                        />
                    ))}
                </div>
            </div>

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
                                inputControls={inputControls}
                                name={InvoiceFormInput.Name}
                                label='Name'
                                required={true}
                                className='sm:col-span-full'
                            />
                            <TextInput 
                                inputControls={inputControls}
                                name={InvoiceFormInput.CIN}
                                type={InputType.Int}
                                maxLength={7}
                                label='CIN'
                                required={true}
                                pattern={/^\d{7}$/}
                            />
                            <TextInput 
                                inputControls={inputControls}
                                name={InvoiceFormInput.VAT}
                                maxLength={10}
                                label='VAT ID'
                                required={true}
                                pattern={/^CZ\d{8}$/}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <h3>Address</h3>
                        <div
                            className='grid md:grid-cols-3 gap-3'
                        >
                            <TextInput 
                                inputControls={inputControls}
                                name={InvoiceFormInput.Street}
                                label='Street'
                                required={true}
                                className='col-span-full'
                            />
                            <TextInput 
                                inputControls={inputControls}
                                name={InvoiceFormInput.City}
                                label='City'
                                required={true}
                                className='md:col-span-2'
                            />
                            <TextInput 
                                inputControls={inputControls}
                                name={InvoiceFormInput.ZIP}
                                type={InputType.Int}
                                label='ZIP code'
                                required={true}
                                onChangeFormat={formatZipCode}
                                pattern={/^\d{3}\s\d{2}$/}
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
                            inputControls={inputControls}
                            name={InvoiceFormInput.WorkLabel}
                            label='Label'
                            required={true}
                            className='col-span-full'
                        />
                        <TextInput 
                            inputControls={inputControls}
                            name={InvoiceFormInput.Rate}
                            type={InputType.Float}
                            label='Rate CZK/hr'
                            required={true}
                        />
                        <TextInput 
                            inputControls={inputControls}
                            name={InvoiceFormInput.Hours}
                            type={InputType.Float}
                            label='Hours Worked'
                            required={true}
                        />
                        <TextInput 
                            inputControls={inputControls}
                            name={InvoiceFormInput.ExtraIncome}
                            type={InputType.Float}
                            label='Extra Income'
                            required={true}
                        />
                        <TextInput 
                            inputControls={inputControls}
                            name={InvoiceFormInput.Expenses}
                            type={InputType.Float}
                            label='Expenses'
                            required={true}
                        />
                    </div>  
                </div>

                <div className='space-y-4'>
                    <h2>Extra Info</h2>

                    <TextAreaInput 
                        inputControls={inputControls}
                        name={InvoiceFormInput.ContractInfo}
                        label='Contract Info'
                        className='w-full'
                    />
                </div>

            </div>

            <SubmitButton text='Generate Invoice' />
        </form>
    )
}

export default InvoiceForm