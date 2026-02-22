export const Header = () => {
  return (
    <header className="navbar">
      <div className="navbox">
        <div href className="nav-left">
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
            {/* <li className="nav-item">
              <a href="stats.html">Stats</a>
            </li> */}
            <li className="nav-item">
              <a href="registration.html">Login</a>
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