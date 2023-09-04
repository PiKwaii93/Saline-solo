import React from "react";

export default class Footer extends React.Component {
  
    

    render() {
        return (
          <div className="footer-container">
            <div className="footer-first-container">
              <div className="footer-first-container-tab">
                <div className="footer-question-newsletter-container">
                  <span className="footer-question-newsletter">Want to stay in touch? Follow us on social media and subscribe to our newsletter.</span>
                </div>
                <div className="footer-question-newsletter-button-container">
                  <button className="footer-question-newsletter-button">Subscribe to the newsletter</button>
                </div>
                <div className="footer-question-newsletter-medias-container">
                  <div className="footer-question-newsletter-medias-container-tab">
                    <img src="/Instagram-white.png.svg" alt="Instagram" className="footer-question-newsletter-medias"></img>
                    <img src="/Facebook-white.png.svg" alt="Facebook" className="footer-question-newsletter-medias"></img>
                    <img src="/Linkedin-white.png.svg" alt="Linkedin" className="footer-question-newsletter-medias"></img>
                    <img src="/Youtube-white.png.svg" alt="Youtube" className="footer-question-newsletter-medias"></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-second-container">
              <div className="footer-second-container-tab">
                <div className="footer-second-link-container-all">
                  <div className="footer-second-link-container-tab">
                    <div className="footer-second-link-container">
                      <span className="footer-second-link">Masterclasses</span>
                      <span className="footer-second-sub-link">Offers</span>
                      <span className="footer-second-sub-link">FAQ</span>
                      <span className="footer-second-sub-link">Professors</span>
                    </div>
                  </div>
                  <div className="footer-second-link-container-tab">
                    <div className="footer-second-link-container">
                      <span className="footer-second-link">Academies</span>
                      <span className="footer-second-sub-link">Information</span>
                      <span className="footer-second-sub-link">Program</span>
                      <span className="footer-second-sub-link">Registration</span>
                    </div>
                  </div>
                  <div className="footer-second-link-container-tab">
                    <div className="footer-second-link-container">
                      <span className="footer-second-link">Saline Royale Academy</span>
                      <span className="footer-second-sub-link">About</span>
                      <span className="footer-second-sub-link">Contact</span>
                    </div>
                  </div>
                </div>
                <div className="footer-second-text-container">
                  <span className="footer-second-text">The Saline royale academy aims to participate in the training of the best musicians of tomorrow. To this end, we offer online or in-person masterclasses at the Saline royale of Arc et Senans, given by the greatest masters of classical music. The Saline royale Academy is a private higher-education institution authorized to issue ECTS credits.</span>
                </div>
              </div>
            </div>
            <div className="footer-third-container">
              <div className="footer-third-container-all">
                <div className="footer-third-container-tab">
                  <span className="footer-third-link">GTC</span>
                  <span className="footer-third-link">Policy of the cookies deposited</span>
                  <span className="footer-third-link">Cookie management panel</span>
                </div>
                <div className="footer-third-container-tab">
                  <span className="footer-third-link">General conditions of use</span>
                  <span className="footer-third-link">Privacy policy</span>
                  <span className="footer-third-link">Sitemap</span>
                </div>
              </div>
            </div>
          </div>
        );
      }
}
