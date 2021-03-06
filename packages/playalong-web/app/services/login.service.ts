login.$inject = ['$q', '$rootScope', 'PlyFirebase'];
function login($q: ng.IQService, $rootScope, PlyFirebase) {

  let userModel;
  let authModel;

  function getProviderData() {
    if (authModel && authModel.providerData && authModel.providerData.length) {
      return authModel.providerData[0];
    }
  }

  PlyFirebase.authentication.onAuthStateChanged(function(authData) {
    if (authData === null) {
      userModel = null;
      authModel = null;
    }
    else {
      authModel = authData;
      // Check if user is signed up
      const usersRef = PlyFirebase.getRef('users');
      usersRef.orderByChild('uid').equalTo(authData.uid).on('value', function(snapshot) {
        const rawData = snapshot.val();

        if (!rawData) {
          // Add it
          let email;
          let firstName;
          let lastName;
          let fullName;
          const providerData = getProviderData();
          switch (providerData.providerId) {
            case 'google.com':
            case 'facebook.com':
            email = providerData.email;
            fullName = providerData.displayName.split(' ');
            firstName = fullName[0];
            lastName = fullName[1];
            break;
            case 'password':
            email = providerData.email;
            firstName = '';
            lastName = '';
            break;
            default:
            break;
          }

          userModel = {
            // TODO - Validations and extract by platform
            email,
            firstName,
            lastName,
            uid: authData.uid,
            userType: 'normal',
            creationDate: new Date().getTime() / 1000,
          };
          usersRef.push(userModel);
        }
        else {

          userModel = rawData[Object.keys(rawData)[0]];

          // Append the key to the model
          userModel.userKey = Object.keys(rawData)[0];

        }
        $rootScope.$broadcast('plyUserLoggedIn', userModel);

      });
    }
  });

  function loginEmail(email: string, password: string) {
    return new Promise((resolve, reject) => {
      PlyFirebase.authentication.signInWithEmailAndPassword(email, password)
      .then((userData) => resolve(userData))
      .catch(error => reject(error));
    });
  }

  function loginSocial(platform: string) {
    return new Promise((resolve, reject) => {

      let provider;
      switch (platform) {
        case 'facebook':
        provider = PlyFirebase.facebookProvider;
        break;
        case 'google':
        provider = PlyFirebase.googleProvider;
        break;
        default:
        provider = PlyFirebase.googleProvider;
        break;
      }
      provider.addScope('email');

			PlyFirebase
				.authentication
				.signInWithPopup(provider)
				.then(authData => {
					analytics.track('LoggedIn', {
						userId: authData.uid,
					});

					// User successfully logged in
					userModel = authData.user;
					resolve(authData);
      })
      .catch((error) => reject(error));
    });
  }

  const getUser = () => userModel;

  const isLoggedIn = () => !!userModel;

  function logout() {
    PlyFirebase.signOut()
    .then(() => $rootScope.$broadcast('plyUserLoggedOut'));
  }

  const getAuth = () => authModel;

  const getFirstName = () => userModel ? userModel.firstName : '';

  const getLastName = () => userModel ? userModel.lastName : '';

  const getFullName = () => getFirstName() + ' ' + getLastName();


  function isSuperUser() {
    return  getUser() && getUser().userType &&
    (this.getUser().userType.indexOf('superuser') !== -1 || this.getUser().userType.indexOf('admin') !== -1) ;
  }

  function createUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      PlyFirebase.authentication.createUserWithEmailAndPassword(email, password)
      .then(userData => resolve(userData))
      .catch(error => reject(error));
    });
  }

  function resetPassword(email: string) {
    return new Promise((resolve, reject) => {

      PlyFirebase.authentication.sendPasswordResetEmail(email)
      .then(() => {
        console.log(`Reset password sent to ${email}`);
        resolve();
      })
      .catch(error => reject(error));
    });
  }
  return {
    loginSocial,
    loginEmail,
    getUser,
    getAuth,
    isLoggedIn,
    logout,
    getFirstName,
    getLastName,
    getFullName,
    isSuperUser,
    createUser,
    resetPassword,
    // changePassword,
  };
}

export default login;
