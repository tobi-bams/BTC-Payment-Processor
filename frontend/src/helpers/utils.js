/**
 * Get the color name/value based on given status
 * v1.2.0
 */
export const getStatusColor = (invoicestatus) => {
    let color = '';
    switch (invoicestatus) {
        case 'pending':
            color = 'bg-yellow-400';
            break;
        case 'complete':
            color = 'bg-green-600';
            break;
        case 'canceled':
            color = 'bg-red-600';
            break;
        default:
            color = 'bg-gray-300';
    }
    return color;
};

const utils = [
    getStatusColor
];

export default utils;