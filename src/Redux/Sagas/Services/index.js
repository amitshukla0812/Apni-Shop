
// use this function if payload has only text data(no file feild)
export async function createRecord(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        response = await response.json()
        return response

    } catch (error) {
        console.log(`Error while creating record in API calling service : ${error}`)
        return []
    }
}


// use this function if payload has form data (atleast 1 file field)
export async function createMultipartRecord(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: "POST",
            headers: {

            },
            body: payload
        })

        response = await response.json()
        return response

    } catch (error) {
        console.log(`Error while creating record in API calling service : ${error}`)
        return []
    }
}



export async function getRecord(collection) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }

        })

        response = await response.json()
        return response

    } catch (error) {
        console.log(`Error while getting record in API calling service : ${error}`)
        return []
    }
}




// use this function if payload has only text data(no file feild)
export async function updateRecord(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        response = await response.json()
        return response

    } catch (error) {
        console.log(`Error while updating record in API calling service : ${error}`)
        return []
    }
}



// use this function if payload has form data (atleast 1 file field)
export async function updateMultipartRecord(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.get("id")}`, {
            method: "PUT",
            headers: {

            },
            body: payload
        })

        response = await response.json()
        return response

    } catch (error) {
        console.log(`Error while updating record in API calling service : ${error}`)
        return []
    }
}





export async function deleteRecord(collection,payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }

        })

        response = await response.json()
        return response

    } catch (error) {
        console.log(`Error while deleting record in API calling service : ${error}`)
        return []
    }
}
