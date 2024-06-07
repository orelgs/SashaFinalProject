import { useState } from 'react';
import AuthContent from '../Auth/AuthContent';
import LoadingOverlay from '../UI/LoadingOverlay';
import { createUser } from '../Util/Auth';

function SignupScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
  
    async function signupHandler({ email, password }) {
      setIsAuthenticating(true);
      await createUser(email, password);
      setIsAuthenticating(false);
    }
  
    if (isAuthenticating) {
      return <LoadingOverlay message="Creating user..." />;
    }
  
    return <AuthContent onAuthenticate={signupHandler} />;
  }
  
  export default SignupScreen;