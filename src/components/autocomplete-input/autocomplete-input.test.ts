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
		autocompleteInput.typeIn(validTerm);
		expect(autocompleteInput.isDisplayingResultsContainer()).toBe(true);
	});

	it('Should show title and description in the results', () => {
		const autocompleteInput = AutocompleteInputDriver.build(testSearchItems);
		const expectedTitles = testSearchItems.map(item => item.title);
		const expectedDescriptions = testSearchItems.map(item => item.description);

		autocompleteInput.typeIn(validTerm);
		expect(autocompleteInput.getResultTitles()).toEqual(expectedTitles);
		expect(autocompleteInput.getResultDescriptions()).toEqual(expectedDescriptions);
	});

	it('Should inform when there are no results when typing', () => {
		const autocompleteInput = AutocompleteInputDriver.build(testSearchItems);
		const someInvalidTerm = 'fewfewfw';
		expect(autocompleteInput.isDisplayingResultsContainer()).toBe(false);
		autocompleteInput.typeIn(someInvalidTerm);
		expect(autocompleteInput.isDisplayingEmptyResults()).toBe(true);
	});
});
