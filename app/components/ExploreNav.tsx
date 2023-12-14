import Search from "./Search";
import FilterSheet from "./FilterSheet";
import { useMediaQuery } from "react-responsive";

type ExploreNavProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | any[]>>;
};

const ExploreNav: React.FC<ExploreNavProps> = ({ 
  setProperties }) => {
    const isMobile = useMediaQuery({
      query: "(max-width:640px), { noSsr: true }",
    });
  
    return (
      <nav className="flex flex-row items-center gap-4 relative my-4 w-full">
        {isMobile ? (
          <>
            <Search setProperties={setProperties} />
            <FilterSheet />
          </>
        ) : (
          <div className='flex gap-4'>
            <p>NESST logo here</p>
            <Search setProperties={setProperties} />
            <p>Explore</p>
            <p>Messages</p>
            <p>Profile</p>
            <FilterSheet />
            
          </div>
          
        )}
      </nav>
    );
  };

export default ExploreNav;
