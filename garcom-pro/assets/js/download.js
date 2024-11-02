// Functions
function download() {
    let data = getCookies("data");
    let dataSplit = data.split("#");
    let json = {"data": []};

    for (let segment of dataSplit) {
        if (segment) {
            let loadPrice = [];
            let loadCommission = [];
            let loadTypePayment = [];

            for (let index=0; index < (segment.length-5)/6; index++) {
                console.log(1);
                let minisegment = segment.slice(index*6, (index+1)*6);

                let priceBase62 = minisegment.slice(0, 4);
                let commissionBase62 = minisegment.slice(4, 5);
                let typePaymentBase62 = minisegment.slice(5, 6);
                var timeBase62 = segment.slice(-5);

                loadPrice.push(base62Decrypt(priceBase62) / 100);
                loadCommission.push(base62Decrypt(commissionBase62));
                loadTypePayment.push(base62Decrypt(typePaymentBase62));
            }
            const entry = {
                "price": loadPrice,
                "commission": loadCommission,
                "typePayment": loadTypePayment,
                "time": base62Decrypt(timeBase62) + 1704078000
            };
            json["data"].push(entry);
        }
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