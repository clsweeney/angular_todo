export default class User {
	constructor(AppConstants, $http, $state, $q) {
		'ngInject';
		
		this._AppConstants = AppConstants;
		this._$http = $http;
		this._$state = $state;
		this._$q = $q;

		this.current = undefined;
	}

	attemptAuth(type, credentials) {
		var $self = this;
		if (this._AppConstants.useSessionStorage) {
			if (credentials.password === 'todos') {
				$self.current = {username: credentials.username};
			}
			return this._$q(function(resolve, reject) {
					if (credentials.password === 'todos') {
						$self.current = {username: credentials.username};
						resolve('Login SUCCESS');
					} else {
						reject('Login FAILED');
					}
			});
		} else {
			var headers = credentials ? {authorization : "Basic "
				+ btoa(credentials.username + ":" + credentials.password)
			} : {};
			return this._$http.get('user', {headers : headers});
		}
	}

	logout() {
		var $self = this;
		this._$http.post('logout', {}).finally(function() {
			$self.current = undefined;
			$self._$state.go('app.login', null, { reload: true });
		});
	}

	verifyAuth() {
		let deferred = this._$q.defer();
		deferred.resolve(false);
		return deferred.promise;
	}

	ensureAuthIs(bool) {
		let deferred = this._$q.defer();

		this.verifyAuth().then((authValid) => {
			if (authValid !== bool) {
				this._$state.go('app.home')
				deferred.resolve(false);
			} else {
				deferred.resolve(true);
			}

		});

		return deferred.promise;
	}
	
	currentUsername() {
		return (this._User && this._User.current && this._User.current.username) || 'Unknown';
	}

}
