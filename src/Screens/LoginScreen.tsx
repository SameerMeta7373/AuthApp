import {useContext, useState} from 'react';
import AuthContent from '../Components/Auth/AuthContent';
import LoadingOverlay from '../Components/UI/LoadingOverlay';
import {CreateUser, Login} from '../Utility/Auth';
import {Alert} from 'react-native';
import {AuthContext} from '../Store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setisAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function LoginHandler({email, password}) {
    setisAuthenticating(true);
    try {
      const token = await Login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication Failed!',
        'Could not log in. Please check your credentials!',
      );
      setisAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging In..." />;
  }
  return <AuthContent isLogin onAuthenticate={LoginHandler} />;
}

export default LoginScreen;
