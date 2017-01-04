export type SearchItem = {
	title: string,
	description: string
};

class AutocompleteInputDirectiveController {
	searchableItems: SearchItem[];
	results: SearchItem[];
	isFocused: boolean;
	searchTerm: string;

	constructor() {
		// Empty
	}

	handleInputChange() {
		// When there is a change in the input field text, filter out the irrelevant results based on the beginning of
		// the string. If the text field is empty, hide the results altogether.
		this.results = this.searchTerm ? this.searchableItems.filter(item => item.title.indexOf(this.searchTerm) === 0) : [];
	}

	handleFocus() {
		this.isFocused = true;
	}

	handleBlur() {
		this.isFocused = false;
	}
}

export function autocompleteInputDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			searchableItems: '=',
		},
		templateUrl: 'components/autocomplete-input/autocomplete-input.tpl.html',
		controller: AutocompleteInputDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}
