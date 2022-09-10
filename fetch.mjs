import https from "https"

export function fetch(url, token) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        }, res => {
            const data = [];
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            // console.log('Status Code:', res.statusCode);
            // console.log('Date in Response header:', headerDate);

            if (res.statusCode !== 200) {
                reject(new Error(`Error response: ${res.statusCode} (${res.statusMessage})`))
                return
            }

            res.on('data', chunk => {
                data.push(chunk);
            });

            res.on('end', () => {
                // console.log('Response ended: ');
                const result = JSON.parse(Buffer.concat(data).toString());
                resolve(result)
            });
        }).on('error', err => {
            reject(err)
        });
    })
}