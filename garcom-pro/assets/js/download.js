// Functions
function download() {
    let dataBase62 = getCookies("data");
    let json = {"data": []};

    for (let index=0; index < dataBase62.length / 11; index++) {
        const segment = dataBase62.slice(index*11, (index+1)*11);
        const priceBase62 = segment.slice(0, 4);
        const commissionBase62 = segment.slice(4, 5);
        const typePaymentBase62 = segment.slice(5, 6);
        const timeBase62 = segment.slice(6, 11);
        const entry = {
            "price": base62Decrypt(priceBase62) / 100,
            "commission": base62Decrypt(commissionBase62),
            "typePayment": base62Decrypt(typePaymentBase62),
            "time": base62Decrypt(timeBase62) + 1704078000
        };
        json["data"].push(entry);
    }

    const jsonString = JSON.stringify(json, null, 2);
    const blob = new Blob([jsonString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const formattedDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const time = Math.floor(new Date().getTime() / 1000) - 1704078000;
    const filename = formattedDate + "-" + time;

    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.gpro.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}
