/**
 * Get the color name/value based on given status
 * v1.2.0
 */
export const getStatusColor = (invoicestatus) => {
    let color = '';
    switch (invoicestatus) {
        case 'pending':
            color = 'bg-yellow-400 text-black';
            break;
        case 'paid':
            color = 'bg-green-600 text-white';
            break;
        case 'expired':
            color = 'bg-red-600 text-white';
            break;
        default:
            color = 'bg-gray-300 text-black';
    }
    return color;
};

const utils = [
    getStatusColor
];

export default utils;