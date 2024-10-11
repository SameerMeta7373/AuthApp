import {useContext, useState} from 'react';
import AuthContent from '../Components/Auth/AuthContent';
import {CreateUser} from '../Utility/Auth';
import LoadingOverlay from '../Components/UI/LoadingOverlay';
import {Alert} from 'react-native';
import {AuthContext} from '../Store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setisAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function SignUpHandler({email, password}) {
    setisAuthenticating(true);
    try {
      const token = await CreateUser(email, password);
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
    return <LoadingOverlay message="Creating User.." />;
  }
  return <AuthContent onAuthenticate={SignUpHandler} />;
}

export default SignupScreen;
