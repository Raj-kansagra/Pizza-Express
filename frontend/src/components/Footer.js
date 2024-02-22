import React from 'react';
import "./footer.css";
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='main-contain'>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css" />
  <div className="footer-dark">
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-3 item">
            <h3>Services</h3>
            <ul>
              <li><NavLink to='/'>Web design</NavLink></li>
              <li><NavLink to='/'>Development</NavLink></li>
              <li><NavLink to='/'>Hosting</NavLink></li>
            </ul>
          </div>
          <div className="col-sm-6 col-md-3 item">
            <h3>About</h3>
            <ul>
              <li><NavLink to='/'>Company</NavLink></li>
              <li><NavLink to='/'>Team</NavLink></li>
              <li><NavLink to='/'>Careers</NavLink></li>
            </ul>
          </div>
          <div className="col-md-3 item text">
            <h3>My Restaurant</h3>
            <p>Tel: 123-456-7890</p>
            <p>Email: info@mysite.com</p>
            <p>Office: Mumbai</p>
          </div>
          <div className="col item social"><NavLink to='/'><i className="icon ion-social-facebook" /></NavLink><NavLink to='/'><i className="icon ion-social-twitter" /></NavLink><NavLink to='/'><i className="icon ion-social-snapchat" /></NavLink><NavLink to='/'><i className="icon ion-social-instagram" /></NavLink></div>
        </div>
        <p className="copyright">Company Name © 2018</p>
      </div>
    </footer>
  </div>
</div>

  )
}

export default Footer;


