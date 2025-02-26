import React from "react";
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-white mt-5">
      {/* Social Media Section */}
      <div className=" p-3">
        <section className="d-flex justify-content-center gap-2">
          {/* Facebook */}
          <a className="btn btn-primary btn-floating" style={{ backgroundColor: "#3b5998" }} href="#!" role="button">
            <FaFacebookF />
          </a>
          {/* Twitter */}
          <a className="btn btn-primary btn-floating" style={{ backgroundColor: "#55acee" }} href="#!" role="button">
            <FaTwitter />
          </a>
          {/* Google */}
          <a className="btn btn-primary btn-floating" style={{ backgroundColor: "#dd4b39" }} href="#!" role="button">
            <FaGoogle />
          </a>
          {/* Instagram */}
          <a className="btn btn-primary btn-floating" style={{ backgroundColor: "#ac2bac" }} href="#!" role="button">
            <FaInstagram />
          </a>
          {/* Linkedin */}
          <a className="btn btn-primary btn-floating" style={{ backgroundColor: "#0082ca" }} href="#!" role="button">
            <FaLinkedinIn />
          </a>
          {/* Github */}
          <a className="btn btn-primary btn-floating" style={{ backgroundColor: "#333333" }} href="#!" role="button">
            <FaGithub />
          </a>
        </section>
      </div>
      
      {/* Copyright Section */}
      <div className="text-center p-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © {new Date().getFullYear()} Copyright:  
        <a className="text-white ms-1" href="https://www.cheenta.com/">Cheenta</a>
      </div>
    </footer>
  );
};

export default Footer;
