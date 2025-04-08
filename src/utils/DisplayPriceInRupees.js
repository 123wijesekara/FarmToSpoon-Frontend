export const DisplayPriceInRupees = (price)=>{
    return new Intl.NumberFormat('en-IN',{
        style : 'currency',
        currency : 'LKR'
    }).format(price)
    .replace('LKR', 'Rs.');
}