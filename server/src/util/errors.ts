export class BadRequestError extends Error {
    constructor (msg :string) {
        super(msg)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BadRequestError)
        }
    }
}

export class NotFoundError extends Error {
    constructor (msg :string) {
        super(msg)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError)
        }
    }
}