const mainUrl = 'http://localhost:3000/'
function getToken() {
    return localStorage.getItem('userToken')
}

export function getCards() {
    return fetch(`${mainUrl}cards`, {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        }
    })
}

export function getMyCard(cardId) {
    return fetch(`${mainUrl}cards/getmycardbyid?cardId=${cardId}`, {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        }
    })
}

export function getMyCards() {
    return fetch(`${mainUrl}cards/getmycards`, {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        }
    })
}

export function updateCard(id, card) {
    return fetch(`${mainUrl}cards/updatecard?cardid=${id}`, {
        method: 'put',
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        },
        body: JSON.stringify(card)
    })
}

export function addCard(newCard) {
    return fetch(`${mainUrl}cards/create`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        },
        body: JSON.stringify(newCard)
    })
}
export function deleteMyCard(cardid) {
    return fetch(`${mainUrl}cards/deleteone?cardid=${cardid}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            token: getToken()
        }
    })
}

export function getUser() {
    return fetch(`${mainUrl}customers/getmydetails`, {
        method: 'get', headers: {
            "Content-Type": "application/json",
            token: getToken()
        }
    })

}

export function signin(userLoggingIn) {
    return fetch(`${mainUrl}customers/signin`,
        {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userLoggingIn)
        })
}

export function signUp(client) {
    return fetch(`${mainUrl}customers/register`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client)
    })

}

export function getCreatorDetails(creatorId) {
    return fetch(`${mainUrl}customers/getCustomersDetails?customerId=${creatorId}`, {
        method: 'get', headers: {
            "Content-Type": "application/json",
            token: getToken()
        }
    })
}
