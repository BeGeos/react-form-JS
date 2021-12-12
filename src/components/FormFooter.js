import React from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Github, Twitter, YouTube icons
import {
  faGithub,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function FormFooter() {
  return (
    <div className="form__footer">
      <div className="social-icons">
        <a href="https://github.com/BeGeos" target="_blank" rel="noreferrer">
          <div className="github">
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </div>
        </a>
        <a
          href="https://twitter.com/BeGeosDev"
          target="_blank"
          rel="noreferrer"
        >
          <div className="twitter">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </div>
        </a>
        <a
          href="https://www.youtube.com/channel/UCu4BKIihXPSRxCz6kEUK56g"
          target="_blank"
          rel="noreferrer"
        >
          <div className="youtube">
            <FontAwesomeIcon icon={faYoutube} size="lg" />
          </div>
        </a>
      </div>
      <div>
        <span className="small">
          Follow me on my channel:{" "}
          <a
            href="https://www.youtube.com/channel/UCu4BKIihXPSRxCz6kEUK56g"
            target="_blank"
            rel="noreferrer"
          >
            @BeGeos
          </a>
        </span>
      </div>
    </div>
  );
}
