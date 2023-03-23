import crypto from 'crypto'

export const createTestHashDbName = () => {
    const shasum = crypto.createHash("md5")
    shasum.update(expect.getState().currentTestName);
    return `log-site-test-${shasum.digest("hex")}`;
    
}