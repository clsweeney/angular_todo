class AuthCtrl {
	constructor(User, $state) {
		'ngInject';

		this._User = User;
		this._$state = $state;

		this.title = $state.current.title;
		this.authType = $state.current.name.replace('app.', '');

	}

	submitForm() {
		this.isSubmitting = true;
		self = this;

		this._User.attemptAuth(self.authType, self.formData).then(
				(res) => {
					self._User.current = {username: self.formData.username};
					self._$state.go('app.home');
				},
				(err) => {
					self.isSubmitting = false;
					self.errors = 'Username or password invalid';
				}
		)
	}
}

export default AuthCtrl;
