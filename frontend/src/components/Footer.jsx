import React from "react";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer bg-base-300 text-base-content p-10 sticky shadow-inner">
      <nav>
        <h6 className="footer-title">Main Links</h6>
        <a href="/" className="link link-hover">
          Home
        </a>
        <a className="link link-hover">About us</a>
        <a href="/contact" className="link link-hover">
          Contact us
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Products</h6>
        <a className="link link-hover">Tin Plate</a>
        <a className="link link-hover">Tin Free</a>
        <a className="link link-hover">Black Plate</a>
        <a className="link link-hover">Misprints</a>
      </nav>
      <nav>
        <h6 className="footer-title">Optimum Steels</h6>
        <p>Address: KN/B-11 Anand Parvat, New Delhi -110005</p>
        <p>Call us: +91-9818287365</p>
        <p>Email: optimumsteels@yahoo.com</p>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4 cursor-pointer">
          <a>
            <FaFacebook className="size-7 font-bold" />
          </a>
          <a>
            <RiInstagramFill className="size-7 font-bold" />
          </a>
          <a href="mailto:optimumsteels@yahoo.com" target="_blank">
            <MdEmail className="size-7 font-bold" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
