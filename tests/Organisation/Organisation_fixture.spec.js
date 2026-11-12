import {test} from '../../Fixtures/CRMorganisationFixture.js'
import orgdata from '../../TestData/Organisation.json'

test('',async({orgfixture})=> {
    await orgfixture.OrgClick()
    await OrgObj.OrgAction(Orgdata.OrganisationName,Orgdata.Phone)
    await OrgObj.validation(Orgdata.OrganisationName)

})