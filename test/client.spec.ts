import * as TestUtils from 'react-addons-test-utils';

import {
	only,
	skip,
	slow,
	suite,
	test,
	timeout,
} from 'mocha-typescript';

@suite class Hello {
	@test public 'world'() {}
}
