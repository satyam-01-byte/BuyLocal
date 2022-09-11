import React from "react";
import './styles/Footer.css'
import Insta from  './logos/instagram-logo.png'
import Linkedin from  './logos/linkedin.png'
//Footer

const Footer = () => {
  return (
    <div className="footerDiv">
        <div className="social frcc">
          <a href="https://www.instagram.com/locer_o1/" className="social-logo" target="_blank" rel='noreferrer'>
            <img src ={Insta} alt ="instagram" height="30px" />
            </a>
          <a href="https://www.linkedin.com/company/locer-private-limited/" className="social-logo" target="_blank" rel='noreferrer'>
            <img src ={Linkedin} alt ="linkedin" height="30px" />
            </a>
        </div>
        <div className="copyrightText">
          <p className="footerText" style={{color:"white"}}>Copyright &copy; Locer {new Date().getFullYear()}</p>
        </div>
    </div>
  );
};

export default Footer;
