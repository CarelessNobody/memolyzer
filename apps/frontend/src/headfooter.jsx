import { useFetch, successNotification, failureNotification, getUserId } from './utils';
export const Header = () => {
  const userId = getUserId();
  
  const handleAuth = (e) => {
    if (userId) {
      localStorage.removeItem('userID');
      window.location.reload();
    } 
    else {
      window.location.href = 'registration.html';
    }
  };

  return (
    <header className="navbar">
      <div className="navbox">
        <div className="nav-left">
          <div>
            <h3 className="name"><a href="homepage.html">Memolyzer</a></h3>
          </div>
          <a href="homepage.html">
            <img className="icon" src="/memolyzericon.png" alt="logo" />
          </a>
        </div>

        <nav className="nav-right">
          <ul>
            <li className="nav-item">
              <a href="explore.html">Explore</a>
            </li>
            <li className="nav-item">
              <a href="library.html">Your Library</a>
            </li>
            <li className="nav-item">
              {userId ? (<button onClick={handleAuth}>Log out</button>):
              (<a href="registration.html">Log in</a>)}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export const Footer = () => {
  return (
    <footer className="footer">
      <p>Est 2/20/2026</p>
    </footer>
  )
}