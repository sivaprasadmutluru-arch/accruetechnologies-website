export function syncEnquiry(env:any,reference:string):Promise<{status:string}>;
export function syncPendingEnquiries(env:any):Promise<Array<{reference:string;status:string}>>;
