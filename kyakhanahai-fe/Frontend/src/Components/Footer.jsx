import React from "react";
import "../App.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <div className="border-t border-gray-500 h-40 gap-4 bg-bg-red z-9999 text-font-yellow flex flex-col justify-center items-center transition-all duration-150 w-full  opacity-100  ">
      <div className="flex gap-12 z-9999">
        <div>
          <a
            href="https://www.linkedin.com/in/kashyapsolanki2210/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-font-yellow"
          >
            <LinkedInIcon sx={{ color: "#ffeb3b" }} color="secondary" />
            LinkedIn
          </a>
        </div>
        <div>
          <a
            href="https://github.com/Kashyap2210?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-font-yellow"
          >
            <GitHubIcon sx={{ color: "#ffeb3b" }} color="secondary" />
            Github
          </a>
        </div>
        <div>
          <a
            href="https://www.instagram.com/kash_codes_/?igsh=MTI4ZXY2OGFwOWFhNw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-font-yellow"
          >
            <InstagramIcon sx={{ color: "#ffeb3b" }} color="secondary" />
            Instagram
          </a>
        </div>
        <div>
          <a
            href="https://www.youtube.com/channel/UCC7_EltJMddOsGmANSxShCw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-font-yellow"
          >
            <YouTubeIcon sx={{ color: "#ffeb3b" }} color="secondary" />
            Youtube
          </a>
        </div>
      </div>

      <div className={"mt-2 text-font-yellow"}>
        Portfolio Website Of Kashyap Solanki Made Using REACT, TAILWIND,
        MATERIAL UI
      </div>
    </div>
  );
}
