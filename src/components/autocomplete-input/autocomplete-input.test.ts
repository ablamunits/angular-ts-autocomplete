import {AutocompleteInputDriver} from './autocomplete-input.driver';
describe ('Autocomplete Input field', () => {
	const testSearchItems: string[] = ['This is some searchable item', 'this is another searchable item'];
	const validTerm = 'searchable';

	beforeEach(() => {
		angular.mock.module('MainApp');
		angular.mock.module('mockTemplates');
	});

	it('Should render the autocomplete field', () => {
		const autocompleteInput = AutocompleteInputDriver.build(testSearchItems);
		expect(autocompleteInput.isInputFieldVisible()).toBe(true);
	});

	it('Should display results container when search is initiated', () => {
		const autocompleteInput = AutocompleteInputDriver.build(testSearchItems);
		expect(autocompleteInput.isDisplayingResults()).toBe(false);
		expect(autocompleteInput.typeIn(validTerm));
		expect(autocompleteInput.isDisplayingResults()).toBe(true);
	});
});
