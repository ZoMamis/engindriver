import Menu from "../../components/Menu";
import NavBar from "../../components/NavBar";

export const WrapperComponents = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-t from-blue-400">
      <NavBar />
      <div className="flex">
        <Menu />
        <div
          className="flex-1 m-2 mr-0 rounded-xl overflow-auto"
          style={{ height: "calc(100vh - 4.5rem)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const Wrapper = (WrappedComponent: any) => () => {
  return (
    <WrapperComponents>
      <WrappedComponent />
    </WrapperComponents>
  );
};

export default Wrapper;
