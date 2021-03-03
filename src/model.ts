export interface IField {
    field_name: string
    amount: number
}
  
export interface IFields {
    fields: IField[]
}

export interface NewValues {
    newLabel: string,
    newValue: string
}

export interface FieldCard {
    displayIcon: boolean,
    editLabel: boolean,
    editValue: boolean,
    label: string,
}