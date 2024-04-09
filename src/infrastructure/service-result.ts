class ServiceResult<T extends object> {
    public readonly isSuccess: boolean;

    constructor(public readonly result: T | null, public readonly error: Error | null) {
        this.isSuccess = error === null;
    }

    static success<T extends object>(result: T): ServiceResult<T> {
        return new ServiceResult(result, null);
    }

    static fail<T extends object>(error: Error): ServiceResult<T> {
        return new ServiceResult(null as unknown as T, error);
    }
}

export default ServiceResult;
