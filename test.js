return ( 
  <Router>
    <div>
      <section class="hero is-fullheight is-danger has-background" >
        <div>
          {notification ? [<img style={{"maxHeight": 250}} alt={notification} src={pic1}></img>,<h1 style={{"backgroundColor": "Red"}}>{notification}</h1> ] : null}
        </div>
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
                <img src={pic1} alt="mastis.co.uk-logo" width="50" height="50"></img>
            </a>
            </div>
            <a role="button" onClick={()=>{let navbarLinks = document.querySelector("#navbar-links"); navbarLinks.classList.toggle('is-active');navbarLinks.classList.toggle('is-transparent')}} className="navbar-burger" id="burger">
              <span></span>
              <span></span>
              <span></span>
            </a>
            <div className="navbar-menu" id="navbar-links">
              <Link className="navbar-item" style={padding} to="/">Home</Link>
              <Link className="navbar-item has-dropdown is-hoverable" style={padding} to="/services">Services</Link>
              <Link className="navbar-item" style={padding} to="/contact">contact</Link>
              <Link className="navbar-item" style={padding} to="/calculator">calculator</Link>
            </div>
        </nav>
        <div className="container is-fluid ">
          <Switch>
            <Route path='/calculator' component={() => { 
                      window.location.href = 'https://www.employedandselfemployed.co.uk/tax-calculator'; 
                      return null;
            }}/>
            <Route path="/services">
              <Services/>
            </Route>
            <Route path="/contact">
              <Contacts
                inform={inform}
                subject={subject}
                setPage={setPage}
              />
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </section>
    </div>
  </Router>
)




return (
  <div class="dropdown">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
      <span>Click me</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu3" role="menu">
    <div class="dropdown-content">
      <a href="#" class="dropdown-item">
        Overview
      </a>
      <a href="#" class="dropdown-item">
        Modifiers
      </a>
      <a href="#" class="dropdown-item">
        Grid
      </a>
      <a href="#" class="dropdown-item">
        Form
      </a>
      <a href="#" class="dropdown-item">
        Elements
      </a>
      <a href="#" class="dropdown-item">
        Components
      </a>
      <a href="#" class="dropdown-item">
        Layout
      </a>
      <hr class="dropdown-divider"/>
      <a href="#" class="dropdown-item">
        More
      </a>
    </div>
  </div>
</div>

<div class="dropdown is-hoverable">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
      <span>Hover me</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu4" role="menu">
    <div class="dropdown-content">
      <div class="dropdown-item">
        <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
      </div>
    </div>
  </div>
</div>
)