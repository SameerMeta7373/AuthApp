import axios from 'axios';
const API_KEY = 'AIzaSyB1Qg8SQP3oEVPjVP9j2dSst2UKF0p1uak';

async function Authenticate(mode, email, password) {
  const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(URL, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;

  return token;
}

export function CreateUser(email, password) {
  return Authenticate('signUp', email, password);
}

export function Login(email, password) {
  return Authenticate('signInWithPassword', email, password);
}
