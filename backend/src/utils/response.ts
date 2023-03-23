export default {
    isError: (body: object) => {
        return Object.hasOwnProperty.call(body, 'error')
    },
    makeSuccessBody: (body: object) => {
        return {
            ...body,
            result: "success"
        }
    },
    makeErrorBody: (body: object) => {
        return {
            ...body,
            result: "fail"
        }
    }
}