import AuthContent from '../Auth/AuthContent';
import LoadingOverlay from '../UI/LoadingOverlay';
import { createUser } from '../Util/Auth';
import { Alert } from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../Store/Auth-context';

function SignupScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
  
    const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
      setIsAuthenticating(false);
    }
  }
  
    if (isAuthenticating) {
      return <LoadingOverlay message="Creating user..." />;
    }
  
    return <AuthContent onAuthenticate={signupHandler} />;
  }
  
  export default SignupScreen;