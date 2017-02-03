class AppFooterCtrl {
	constructor(AppConstants, VersionInfo) {
		'ngInject';
		this.appName = AppConstants.appName;
		this.appVersion = VersionInfo.gitHumanizedBranch();
		this.shortGitHash = VersionInfo.shortGitHash();

		// Get today's date to generate the year
		this.date = new Date();
	}
}

let AppFooter = {
		controller: AppFooterCtrl,
		templateUrl: 'layout/footer.html'
};

export default AppFooter;
