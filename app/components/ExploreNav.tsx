import Search from "./Search";
import Filter from "./Filter";
type ExploreNavProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | any[]>>;
  properties: any[] | null;
};
type FilterProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | number>>;
};
const ExploreNav: React.FC<ExploreNavProps> = ({
  setProperties,
  properties,
}) => {
  return (
    <nav className="flex flex-row items-center gap-4 relative my-4 w-full">
      <Search setProperties={setProperties} />
      <Filter properties={properties} setProperties={setProperties} />
    </nav>
  );
};
export default ExploreNav;
