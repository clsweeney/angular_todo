export default class VersionInfoService {
	constructor(AppConstants, $window) {
		'ngInject';

		this._gitHash = 'TODOS:VersionUnknown';
		this._shortGitHash;
		this._gitBranch = 'TODOS:BranchUnknown';
		this._humanizedBranch;
		this._SHORT_HASH_LENGTH = 11;

        if (this._gitHash.substr(0, 6) === 'TODOS:') {
            this._shortGitHash = 'Unknown';
        } else {
            this._shortGitHash = this._gitHash.substr(0, this._SHORT_HASH_LENGTH);
        }
         
        if (this._gitBranch.substr(0, 6) === 'TODOS:') {
            this._humanizedBranch = 'Unknown';
        } else {
            this._humanizedBranch = this._gitBranch.slice(this._gitBranch.indexOf('/') + 1);
        }
    }

    gitHash() {
        return this._gitHash;
    }

    // Corresponds to the "Commit" field displayed by Stash
     shortGitHash() {
        return this._shortGitHash;
    }
    
    gitHumanizedBranch() {
        return this._humanizedBranch;
    }
}