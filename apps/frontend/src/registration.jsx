import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useFetch, successNotification } from './utils';
import { Header, Footer } from './headfooter'
import './index.css'
import './registration.css'

const Registration = () => {
  const {fetchUrl, data, isLoading, error } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetchUrl({
      url: '/user/register',
      method: 'POST',
      body : {
        username: e.target.elements.username.value,
        email: e.target.elements.email.value,
        password: e.target.elements.password.value
      }
    });
  };

    if (error) {
        console.error("Registration error:", error);
    } else if (data) {
        console.log("Registration successful:", data);
        successNotification("Registration successful!");
    }

  return (
    <form className='registration-form' onSubmit={handleSubmit}>
      <h1>Registration</h1>
      <input type="text" name="username" placeholder="Username" />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button>Submit</button>
    </form>
  );
};

const Login = () => {
    const {fetchUrl, data, isLoading, error } = useFetch();

    const handleLogin = async (e) => {
        e.preventDefault();

        await fetchUrl({
            url: '/user/login',
            method: 'POST',
            body : {
                email: e.target.elements.email.value,
                password: e.target.elements.password.value
            }
        });
    };

    if (error) {
        console.error("Login error:", error);
    } else if (data) {
        console.log("Login successful:", data);
        successNotification("Login successful!");
    }

    return (
    <form className="login-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button>Submit</button>
    </form>
    );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <div className="form-container">
      <Registration />
      <Login />
    </div>
    <Footer />
  </StrictMode>,
)
