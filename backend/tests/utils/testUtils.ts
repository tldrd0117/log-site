import crypto from 'crypto'

export const createTestHashDbName = () => {
    const shasum = crypto.createHash("md5")
    shasum.update(expect.getState().currentTestName);
    return `log-site-test-${shasum.digest("hex")}`;
    
}

export const objectValueToString = (object: {[key: string]: any}) => {
    for(let key in object){
        console.log(key, object[key])
        object[key] = object[key].toString()
    }
    return object
}