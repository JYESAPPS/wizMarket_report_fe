// utils/formatDate.js

const formatDateYM = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월`;
};

export default formatDateYM;
