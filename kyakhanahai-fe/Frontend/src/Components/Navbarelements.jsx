// This component renders the navbar elements and assigns them title and onClick functionalities

import "../App.css";

export default function Navbar({ title, onClick }) {
  return (
    <div className={"ml-20 bgbg-red	text-font-yellow "} onClick={onClick}>
      {title}
    </div>
  );
}
