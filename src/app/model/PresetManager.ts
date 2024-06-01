import presetsJson from '../../assets/data/presets.json'

export interface PresetValues {
    name: string,
    cin: string,
    vat: string,
    street: string,
    city: string,
    zip: string,
    rate: number,
    hours: number|string,
    extra_income: number,
    expenses: number,
    work_label: string,
    contract_info: string
}

export interface Preset {
    color?: string,
    values: PresetValues
}

export default class PresetManager {
    private presets: { [key: string]: Preset } = presetsJson

    getPresetKeys(): string[] {
        return Object.keys(this.presets)
    }

    getPresetValues(key: string|null): PresetValues|undefined {
        return (key && this.presets[key]) ? this.presets[key].values : undefined
    }

    getPresetColor(key: string|null): string|undefined {
        return (key && this.presets[key]) ? (this.presets[key].color ?? undefined) : undefined
    }
}