export const Header = () => {
  return (
    <header className="navbar">
      <ul>
        <li className="nav-item">
          <a href='homepage.html'>Home</a>
        </li>
        <li className="nav-item">
          <a href="explore.html">Explore</a>
        </li>
        <li className="nav-item">
          <a href="library.html">Your Library</a>
        </li>
        <li className="nav-item">
          <a href="stats.html">Stats</a>
        </li>
        <li className="nav-item">
            <a href="registration.html">Login</a>
        </li>
      </ul>
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