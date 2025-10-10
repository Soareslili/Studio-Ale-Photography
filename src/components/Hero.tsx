import { ShuffleHero } from "../components/ui/shuffle-grid";

const Hero = () => {
  return (
    <div
      id="home"
      className="
        w-full min-h-[100svh]   
        bg-[#1E2128]
        flex items-start justify-center
        pt-20 md:pt-24         
        overflow-x-hidden      
      "
    >
      <ShuffleHero />
    </div>
  );
};

export default Hero;
