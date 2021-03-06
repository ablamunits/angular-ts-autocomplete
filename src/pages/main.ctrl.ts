import {SearchItem} from './../components/autocomplete-input/autocomplete-input.drv';
import {GithubRepositoryResult} from './../github-rep.srv';

export class MainPageController {
	// This is the search term used to fetch data from the GitHub API
	searchTerm: string = 'cat';

	githubRepositories: SearchItem[] = [];

	constructor(private $timeout, private GithubRepositoryService, private $scope, private $state, private $window) {
		this.fetchGithubRepositories();
	}

	fetchGithubRepositories() {
		// Use the GitHub search service to lookup repositories that match the search term.
		// Map the results to a valid array of SearchItems that can be used by the autocomplete-input component.
		this.GithubRepositoryService.search(this.searchTerm).then((result: GithubRepositoryResult[]) => {
			this.githubRepositories = result.map(githubRepo => {
				return {
					title: githubRepo.name,
					description: githubRepo.url
				};
			});
		});
	}

	onResultClick(result: SearchItem) {
		this.$window.open(result.description, '_blank');
	}
}
