import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faTwitter,
  faReact,
} from "@fortawesome/free-brands-svg-icons";

const StyledFooter = styled.footer`
  border-radius: 25px;
  text-align: center;
  padding: 25px;
`;

const StyledItem = styled.a`
  margin: 15px;
  color: white;
  transition: all 0.3s;

  &:hover {
    color: red;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <StyledItem
          href="https://reactjs.org/docs/getting-started.html"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faReact} size="2x" />
        </StyledItem>
        <StyledItem
          href="https://twitter.com/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </StyledItem>

        <StyledItem
          href="https://www.youtube.com/watch?v=w7ejDZ8SWv8"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </StyledItem>
      </div>
    </StyledFooter>
  );
};

export default Footer;
