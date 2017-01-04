import BaseDriver from './../../test-utils/base-driver';
import {SearchItem} from './autocomplete-input.drv';

export class AutocompleteInputDriver extends BaseDriver {
	static build(searchableItems: SearchItem[]): AutocompleteInputDriver {
		let elem, scope: any;
		inject(($compile, $rootScope, $timeout) => {
			scope = $rootScope.$new();
			scope.items = searchableItems;

			elem = $compile(`<autocomplete-input searchable-items="items"></autocomplete-input>`)(scope);
			scope.$digest();
			$(document.body).empty().append(elem);
		});

		return new AutocompleteInputDriver(elem, scope);
	}

	isInputFieldVisible(): boolean {
		return this.isChildVisible('.search-input');
	}

	isDisplayingResultsContainer(): boolean {
		return this.isChildVisible('.results-container');
	}

	isDisplayingEmptyResults(): boolean {
		return this.isChildVisible('.results-container .empty-result');
	}

	typeIn(value: string): void {
		this.enterValue('.search-input', value);
	}
}
