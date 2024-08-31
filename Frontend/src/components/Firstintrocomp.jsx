import "../App.css";

export default function Firstintrocomp() {
  return (
    <div className="flex items-center justify-between bg-bg-champagne overflow-hidden p-8">
      <p className="w-1/2 text-2xl text-justify	pr-4">
        Welcome to kyakhanahai.com! We help you answer one of the most difficult
        question... <br />
        <i className="text-4xl font-bold">KHANEY MAI KYA BANAU?</i>
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
