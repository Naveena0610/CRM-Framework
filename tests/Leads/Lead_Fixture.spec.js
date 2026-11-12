import {test} from '../../Fixtures/CRMFixtures.js'
import leaddata from '../../TestData/LeadData.json'

test('',async({leadFixture})=> {
    test.slow()
    await leadFixture.leadClick()
    await leadFixture.actions(leaddata.Fistname,leaddata.LastName,leaddata.Company)
    await leadFixture.validation(leaddata.Fistname)

})


