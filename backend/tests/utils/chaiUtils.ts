
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiJestSnapshot from "chai-jest-snapshot";
 
chai.use(chaiJestSnapshot);
chai.use(chaiAsPromised)
chai.should()
const expect = chai.expect
const assert = chai.assert
const should = chai.should

export {
    chai, expect, assert, should
}