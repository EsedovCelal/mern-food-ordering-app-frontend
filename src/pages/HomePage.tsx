import landingImage from "../assets/landing.png";
import AppDownloadImage from "../assets/appDownload.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 gap-5 flex flex-col text-center -m-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl"> Food is just a click away!</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5 py-10">
        <img src={landingImage} alt="Landing" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download for MernEats App for faster ordering and personalised
            recommendations.
          </span>
          <img src={AppDownloadImage} alt="AppDownloadImage" />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
