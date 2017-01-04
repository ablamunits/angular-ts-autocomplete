// Define my own type, to better work with the request result
export type GithubRepositoryResult = {
	id: number;
	name: string;
	url: string;
};

export class GithubServiceProvider {
	private repoApiUrl = (query: string, page: number) => `https://api.github.com/search/repositories?q=${query}&per_page=50&page=${page}`;

	constructor(private $http: ng.IHttpService) {
		// Empty constructor
	}

	search(searchTerm: string, page: number = 1): ng.IPromise<GithubRepositoryResult[]> {
		const apiUrl = this.repoApiUrl(searchTerm, page);

		return this.$http.get(apiUrl).then((result: any) => {
			const items = result.data.items.map(item => {
				return { id: item.id, name: item.name, url: item.url };
			});

			return items;
		});
	}
}
