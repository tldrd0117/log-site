
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
chai.should()
const expect = chai.expect
const assert = chai.assert
const should = chai.should

export {
    chai, expect, assert, should
}