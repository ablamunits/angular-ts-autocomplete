export type SearchItem = {
	title: string,
	description: string
};

enum KeyCode {
	UP = 38, DOWN = 40
}

class AutocompleteInputDirectiveController {
	searchableItems: SearchItem[];
	results: SearchItem[];
	selectedResultIndex: number = -1;
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
		this.selectedResultIndex = -1;
	}

	handleResultMouseover($event, index) {
		this.selectedResultIndex = index;
	}

	handleKey($event) {
		const key: KeyCode = $event.keyCode;

		switch (key) {
			case KeyCode.UP: this.handleUpKeyPress($event);
				break;
			case KeyCode.DOWN: this.handleDownKeyPress($event);
				break;
		}
	}

	handleUpKeyPress($event) {
		$event.preventDefault();
		const minIndex = 0;
		this.selectedResultIndex = Math.max(this.selectedResultIndex - 1, minIndex);
	}

	handleDownKeyPress($event) {
		$event.preventDefault();
		const maxIndex = this.results.length - 1;
		this.selectedResultIndex = Math.min(this.selectedResultIndex + 1, maxIndex);
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
