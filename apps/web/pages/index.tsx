import { AuthProvider, FirebaseProvider, useAuth, useFirebase } from 'ui';

import { httpsCallable } from 'firebase/functions';

export default function WebConnected() {
  return (
    <FirebaseProvider appName='web'>
      <AuthProvider>
        <Web />
      </AuthProvider>
    </FirebaseProvider>
  );
}

function Web() {
  const { functions } = useFirebase();
  const { signInWithGoogle, signOut, user } = useAuth();

  async function runCallableFunction() {
    if (!functions) throw new Error('Functions not initialized');

    const func = httpsCallable(functions, 'testauth');
    const response = await func({ test: 1 });

    console.log('response.data', response.data);
  }

  return (
    <div>
      {!user && <button onClick={signInWithGoogle}>sign in with google</button>}
      {user && <button onClick={signOut}>sign out</button>}
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      <button onClick={runCallableFunction}>run callable function</button>
    </div>
  );
}
