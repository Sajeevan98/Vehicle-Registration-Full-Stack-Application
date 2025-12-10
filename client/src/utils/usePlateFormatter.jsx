export const usePlateFormatter = () => {

    const oldPlate = (str) => {

        const regex = /^\s*([0-9]{2})\s*(ශ්‍රී)\s*([0-9]{4})\s*$/;

        const match = str.match(regex);
        if (!match)
            return null;

        return `${match[1]} ${match[2]} ${match[3]}`;
    };

    const vintagePlate = (str) => {

        const regex = /^\s*([0-9]{2,3})\s*[- ]\s*([0-9]{4})\s*$/;

        const match = str.match(regex);
        if (!match)
            return null;

        return `${match[1]} - ${match[2]}`;
    };

    const modernPlate = (str) => {
        const regex = /^\s*(?:([A-Za-z]{2})\s+([A-Za-z]{2,3})|([A-Za-z]{2,3}))\s*[- ]\s*([0-9]{4})\s*$/;

        const match = str.match(regex);
        if (!match) 
            return null;

        // with provincial format like (WP ABC 1234)
        if (match[1] && match[2]) {
            return `${match[1].toUpperCase()} ${match[2].toUpperCase()} - ${match[4]}`;
        }

        // standard modern format (ABC 1234)
        return `${match[3].toUpperCase()} - ${match[4]}`;
    };

    return { oldPlate, vintagePlate, modernPlate };
};
