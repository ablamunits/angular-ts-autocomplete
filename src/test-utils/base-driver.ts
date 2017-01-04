export default class BaseDriver {
	element: HTMLElement;
	scope: any;
	$timeout: any;

	constructor(elem: JQuery, scope) {
		this.scope = scope;
		if (elem.length > 0) {
			this.element = elem[0];
			inject($timeout => this.$timeout = $timeout);
		}
	}

	find(selector: string): Element {
		return this.element.querySelector(selector);
	}

	findAll(selector: string): Element[] {
		const elems = this.element.querySelectorAll(selector);
		return Array.prototype.slice.call(elems);
	}

	getText(selector: string): string {
		return this.find(selector).textContent;
	}

	getAllTextBySelector(selector: string): string[] {
		return this.findAll(selector).map(e => e.textContent);
	}

	isChildVisible(selector: string): boolean {
		return !!this.find(selector);
	}

	enterValue(selector: string, value: string): void {
		const inputField = $(this.element).find(selector);
		inputField.val(value).trigger('change').trigger('focus');
	}
}
