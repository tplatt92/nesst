import Search from "./Search";
import FilterSheet from "./FilterSheet";
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
      <FilterSheet setProperties={setProperties} />
    </nav>
  );
};
export default ExploreNav;




// type ExploreNavProps = {
//     setProperties: React.Dispatch<React.SetStateAction<null | number>>;
// };

// const ExploreNav: React.FC<ExploreNavProps> = ({ setProperties }) => {
//     return (
//         <nav className="flex flex-row items-center gap-4 relative my-4 w-full">
//             <Search setProperties={setProperties} />
//             <FilterSheet setProperties={setProperties} />
//         </nav>
//     );
// };

// export default ExploreNav;
