const apiCall = (url,method,token,body,resolve,reject) =>

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token

        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if(response.ok){
            response.json().then(json=>resolve(json))
        } else {
            reject(response)
        }
    })
