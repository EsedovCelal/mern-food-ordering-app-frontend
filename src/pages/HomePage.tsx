import landingImage from "../assets/landing.png";
import AppDownloadImage from "../assets/appDownload.png";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="w-full md:w-auto px-6 md:px-32 bg-white rounded-lg shadow-md py-8 gap-5 flex flex-col text-center -mx-4 md:-mx-16">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-base md:text-xl">Food is just a click away!</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
          searchQuery=""
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 py-10">
        <img
          src={landingImage}
          alt="Landing"
          className="w-full h-auto object-cover rounded-lg"
        />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-2xl md:text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span className="text-sm md:text-base">
            Download the MernEats App for faster ordering and personalised
            recommendations.
          </span>
          <img
            src={AppDownloadImage}
            alt="Download App"
            className="w-48 md:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
