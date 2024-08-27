import "../App.css";

export default function Firstintrocomp() {
  return (
    <div className="flex items-center justify-between bg-bg-champagne overflow-hidden p-8">
      <p className="w-1/2">
        Welcome to kyakhanahai.com! We help you answer one of the most difficult
        question... <i>KHANEY MAI KYA BANAU?</i>
      </p>
      <img
        src="intro_pic.jpg"
        alt=""
        className="w-1/2  main-content overflow-hidden rounded-2xl"
        // style={{ borderRadius: "16px" }}
      />
    </div>
  );
}
