import BaseDriver from './../../test-utils/base-driver';

export class AutocompleteInputDriver extends BaseDriver {
	static build(searchableItems: string[]): AutocompleteInputDriver {
		let elem, scope: any;
		inject(($compile, $rootScope, $timeout) => {
			scope = $rootScope.$new();
			scope.items = searchableItems;

			elem = $compile(`<autocomplete-input searchable-items="items"></autocomplete-input>`)(scope);
			scope.$digest();
			document.body.innerHTML = elem;
		});

		return new AutocompleteInputDriver(elem, scope);
	}

	isInputFieldVisible(): boolean {
		return this.isChildVisible('.search-input');
	}

	isDisplayingResults(): boolean {
		return this.isChildVisible('.results-container');
	}

	typeIn(value: string): void {
		this.enterValue('.search-input', value);
	}
}
