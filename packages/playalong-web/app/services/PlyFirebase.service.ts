import PLY_CONFIG, { Environments } from '../env';
import { apps } from 'firebase/app';
import { initializeApp, auth, database } from 'firebase';

PlyFirebase.$inject = ['$firebaseObject'];
function PlyFirebase($firebaseObject) {

  // Initialize Firebase
  let config;
  if (PLY_CONFIG.env === Environments.DEVELOPMENT) {
    config = {
      apiKey: 'AIzaSyApdtKEld9C-Hbkr62_o4tOPeZl_qiFfTY',
      authDomain: 'playalong.firebaseapp.com',
      databaseURL: 'https://playalong.firebaseio.com',
      storageBucket: 'project-7489461719706903474.appspot.com',
    };
  }
  else { // prod
    config = {
      apiKey: 'AIzaSyAxl5nYfqR_RQPKD0QI_94PWBhpu0C0Q3M',
      authDomain: 'playalong-prod.firebaseapp.com',
      databaseURL: 'https://playalong-prod.firebaseio.com',
      storageBucket: 'playalong-prod.appspot.com',
    };
  }

  if (!apps || !apps.length) {
    initializeApp(config);
}

  const getRef = (path: string) => database().ref(path);
  const authentication = auth();

  function selecteByAggregate(relPath: string, fieldName = '') {
    const fieldNameTrimmed = fieldName.trim();
    
    return new Promise((resolve, reject) => {
      const ref = getRef(relPath);
      ref
        .orderByChild(fieldNameTrimmed)
        .once('value')
        .then(snapshot => {
          resolve(getMax(snapshot, fieldNameTrimmed));
        });
    });
  }

  function getMax(collection, fieldName = '') {
    let max;
    let maxItem;
    let currentItem;

    const fieldNameTrimmed = fieldName.trim();
    collection.forEach(curr => {
      currentItem = curr.val();
      if (!max || currentItem[fieldNameTrimmed] > max) {
        max = currentItem[fieldNameTrimmed];
        maxItem = currentItem;
      }
    });

    return maxItem;
  }

  function selectSimpleQuery(relPath = '', fieldName = '', operator = '', fieldValue = '', refFlag: boolean) {
    const fieldNameTrimmed = fieldName.trim();
    const operatorTrimmed = operator.trim();
    const fieldValueTrimmed = fieldValue.trim();
    
    return new Promise((resolve, reject) => {
      const ref = getRef(relPath);
      ref
        .orderByChild(fieldNameTrimmed)[operatorTrimmed](fieldValueTrimmed)
        .once('value')
        .then(snapshot => {
          const res = refFlag ? snapshot : snapshot.val();
          resolve(res);
        });
    });
  }

  function removeWithQuery(relPath = '', fieldName = '', operator = '', fieldValue = '') {
    const fieldNameTrimmed = fieldName.trim();
    const operatorTrimmed = operator.trim();
    const fieldValueTrimmed = fieldValue.trim();
    
    return new Promise((resolve, reject) => {
      selectSimpleQuery(relPath, fieldNameTrimmed, operatorTrimmed, fieldValueTrimmed, true)
        .then((data: any) => {
          if (data.hasChildren()) {
            data.forEach(function(childRef) {
              childRef.ref.remove();
            });
          }
          resolve({
            message: 'success',
          });
        })
        .catch(error => reject(error));
    });
  }

  function insert(relPath = '', dataObj) {
    return new Promise((resolve, reject) => {
      const ref = getRef(relPath);
      if (ref && ref.push) {
        ref.push(dataObj)
        .then(childRef => {
          resolve($firebaseObject(childRef));
        });
      }
      else {
        setTimeout(reject, 10);
      }
    });

  }

  function getNode(params: any = {}) {
    return new Promise((resolve, reject) => {

      const ref = getRef(params.relPath);
      ref.once('value')
        .then((snapshot) => {
          if (params.isFirebaseObject) {
            resolve($firebaseObject(snapshot.ref));
          }
          else {
            resolve(snapshot.val());
          }

        })
        .catch(error => {
          reject({ error, message: 'Node does not exist' });
        });
    });
  }

  function signOut() {
    return authentication.signOut();
  }

  return {
    authentication,
    getRef,
    insert,
    selectSimpleQuery,
    removeWithQuery,
    signOut,
    getNode,
    selecteByAggregate,
    googleProvider: new auth.GoogleAuthProvider(),
    facebookProvider: new auth.FacebookAuthProvider(),
  };
}

export default PlyFirebase;
