
const regex = /^[a-f0-9]+$/i;

export const validateIfAmountWasAdded = (value: string) => {
    return !value.toString().replaceAll(/\s/g, "").split(",")[1]
}


export const validateInvalidAmound = (value: string) => {
    return !regex.test(
        value?.toString().replaceAll(/\s/g, "").split(",")[1]
    )
}


export const validateAddressLength = (value: string) => {
    return (value?.toString().replaceAll(/\s/g, "").split(",")[0]
        .length < 40 ||
        value?.toString().replaceAll(/\s/g, "").split(",")[0]
            .length > 40)
}


export const validateAddressCharacter = (value: string) => {
    return regex.test(value?.toString())
}

export const validateInaccurateAddress = (value: string) => {
    return value.toString().indexOf(",") !==
        value.toString().lastIndexOf(",")
}