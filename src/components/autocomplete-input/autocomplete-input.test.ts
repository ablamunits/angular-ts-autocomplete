import {SearchItem} from './autocomplete-input.drv';
import {AutocompleteInputDriver} from './autocomplete-input.driver';

describe ('Autocomplete Input field', () => {
	const testSearchItems: SearchItem[] = [
		{ title: 'This is some searchable item', description: 'description 1' },
		{ title: 'This is another searchable item', description: 'woop' }
	];
	const validTerm = 'This';

	beforeEach(() => {
		angular.mock.module('MainApp');
		angular.mock.module('mockTemplates');
	});

	it('Should render the autocomplete field', () => {
		const autocompleteInput = AutocompleteInputDriver.build(testSearchItems);
		expect(autocompleteInput.isInputFieldVisible()).toBe(true);
	});

	it('Should display results container when searching a valid term', () => {
		const autocompleteInput = AutocompleteInputDriver.build(testSearchItems);
		expect(autocompleteInput.isDisplayingResultsContainer()).toBe(false);
		expect(autocompleteInput.typeIn(validTerm));
		expect(autocompleteInput.isDisplayingResultsContainer()).toBe(true);
	});

	it('Should inform when there are no results when typing', () => {
		const autocompleteInput = AutocompleteInputDriver.build(testSearchItems);
		const someInvalidTerm = 'fewfewfw';
		expect(autocompleteInput.isDisplayingResultsContainer()).toBe(false);
		expect(autocompleteInput.typeIn(someInvalidTerm));
		expect(autocompleteInput.isDisplayingEmptyResults()).toBe(true);
	});
});
