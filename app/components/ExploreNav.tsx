import Search from "./Search";
type ExploreNavProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | any[]>>;
};
type FilterProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | number>>;
};
const ExploreNav: React.FC<ExploreNavProps> = ({ setProperties }) => {
  return (
    <nav className="flex flex-row items-center gap-4 relative my-4 w-full">
      <Search setProperties={setProperties} />
    </nav>
  );
};
export default ExploreNav;

