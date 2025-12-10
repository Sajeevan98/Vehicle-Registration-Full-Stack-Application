export const mobileNumberFormatter = (str) => {

    const cleaned = str.replace(/\D/g, ""); // remove non-digit characters

    const regex = /^(0?(?:70|71|72|74|75|76|77|78)\d{7})$/; // all SL mobile numbers pattern

    const match = cleaned.match(regex);
    if (!match) 
        return null;

    const numberWithoutZero = cleaned.startsWith("0") ? cleaned.slice(1) : cleaned; // remove leading 0 if exists

    // console.log(`+94${numberWithoutZero}`);
    return `+94${numberWithoutZero}`; // +94XXXXXXXXX format
};
