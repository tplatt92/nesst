import Search from "./Search";
import FilterSheet from "./FilterSheet";
type ExploreNavProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | any[]>>;
};
const ExploreNav: React.FC<ExploreNavProps> = ({ setProperties }) => {
  return (
    <nav className="flex flex-row items-center gap-4 relative my-4 w-full">
      <Search setProperties={setProperties} />
      <FilterSheet />
    </nav>
  );
};

export default ExploreNav;
