function cdate() {
    return new Date().toJSON();
}

export const logger = {
    info: (msg: string) => console.log(`${cdate()} INFO ${msg}`),
    warning: (msg: string) => console.log(`${cdate()} WARNING ${msg}`),
    error: (msg: string) => console.log(`${cdate()} ERROR ${msg}`),
}
