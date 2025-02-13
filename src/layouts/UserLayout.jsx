import Header from "@layouts/Header";

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default UserLayout;
