import Header from "./Header";

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default UserLayout;
