import {SearchItem} from './../components/autocomplete-input/autocomplete-input.drv';
import {GithubRepositoryResult} from './../github-rep.srv';

export class MainPageController {
	$state: any;

	// This is the search term used to fetch data from the GitHub API
	searchTerm: string = 'fun';

	githubRepositories: SearchItem[] = [];

	constructor(private $timeout, private GithubRepositoryService, private $scope, $state) {
		this.$state = $state;
		this.fetchGithubRepositories();
	}

	fetchGithubRepositories() {
		// Use the github search service to lookup repositories that match the search term
		this.GithubRepositoryService.search(this.searchTerm).then((result: GithubRepositoryResult[]) => {
			this.githubRepositories = result.map(githubRepo => {
				return {
					title: githubRepo.name,
					description: githubRepo.url
				};
			});
		});
	}
}
