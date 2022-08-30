import { initialState, Task } from "https://unpkg.com/@lit-labs/task?module";

export class SignsController {
    host;
    src;

    constructor(host, src) {
        this.host = host;
        this.src = src;
        this.tasks = new Task(
            host,
            async src => {
                const response = await fetch(src);
                const result = await response.json();
                const error = result.error;
                if (error !== undefined) {
                    throw new Error(error);
                }
                return result;
            },
            () => [this.src]
        );
    }
}