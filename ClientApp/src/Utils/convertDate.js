export const convertDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    const dateObject = new Date(`${year}-${month}-${day}`);
    return dateObject.toISOString().split('T')[0];
}

export const getDateDDMMYYYY = (dateString) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}