import { useState, useEffect } from "react";
import Login from "../Auth/Login";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import UserModal from "../User/UserModal";
import { useSelector } from "react-redux";

 

const NavBarDesktopDB = () => {

const navigation = ([
    // { name: 'Admin',  link:'/admin' },
    { name: 'Usuarios',  link:'/admin/users'},
    { name: 'Registrar', link:'/admin/create' },
    { name: 'Productos', link:'/admin/products' },
     
]);
    
  const auth = useAuth();
  const { displayName,photoURL } = auth.user;
  const userName = displayName?.split(" ")[0];
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserModalOpen(false);
  };

  const handleOpenUser = () => {
    setUserModalOpen(true);
  };

  const handleCloseUser = () => {
    setUserModalOpen(false);
  };

  const [adminActive, setAdminActive] = useState(true); // Estado para administrar la activación del menu Admin

  const user = useSelector((state) => state.users.user);
  

  useEffect(() => {
    if (pathname !== '/admin') {
      setAdminActive(false);
    } else {
      setAdminActive(true)
    }
  }, [pathname]);
 
  return (
    <nav className="hidden h-20 max-w-screen bg-white px-10 xl:px-40 md:flex items-center gap-2 shadow-md shadow-gray-300 fixed z-10 top-0 w-full">
      <ul className="flex gap-x-5 items-center flex-wrap font-medium md:max-w-[35%]">
     
        <li className="flex gap-3 items-center">
         <NavLink to="/admin"
         className={ adminActive ? 'bg-sky-700 text-white hover:cursor-pointer rounded-md px-3 py-2 text-sm font-medium' : 'text-gray-600 hover:cursor-pointer hover:bg-sky-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
            
         >
          Admin
         </NavLink>

            {navigation?.map((item)=>(

                <NavLink to={item.link}
                key={item.name}
                  // className={({isActive})=>console.log('isActive',isActive, item.link)}
                 className={({isActive})=> isActive ? 'bg-sky-700 text-white hover:cursor-pointer rounded-md px-3 py-2 text-sm font-medium' : 'text-gray-600 hover:cursor-pointer hover:bg-sky-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                 onClick={() => {
                  if (item.name === 'Admin') {
                    
                    setAdminActive(!adminActive);
                  } else {
                    setAdminActive(false);
                  }
                }}
                >
                {item.name}
                </NavLink>
            ))}
            
        
        </li>
      </ul>
      <figure className="mx-auto">
        <Link to="/">
          <img
            src="/assets/images/logo-karokids.png"
            alt="Logo de KaroKids"
            className="w-[184px] h-[45px]"
          />
        </Link>
      </figure>
      <ul className="flex gap-5 items-center">
        
        {userName ? (
          <li
            onClick={handleOpenUser}
            className="flex flex-row gap-x-3 items-end cursor-pointer"
          >
            <img
              src={photoURL}
              alt="Logo usuarios"
              className="inline-block h-8 w-8 rounded-full ring-2 ring-sky-500"
            />
            <p className="text-sm">Hola, {userName}</p>
          </li>
        ) : (
          <li
            onClick={handleOpenModal}
            className="flex flex-row gap-x-2 items-end cursor-pointer"
          >
            <img
              src="/assets/navbar-icons/user.svg"
              alt="Logo usuarios"
              className="w-6 h-6"
            />
          </li>
        )}

        <li className="cursor-pointer">
          <img
            src="/assets/navbar-icons/fav-blue.svg"
            alt="Logo de Favoritos"
            className="w-6 h-6"
          />
        </li>
        <Link to="/carrito">
          <li className="cursor-pointer">
            <img
              src="/assets/navbar-icons/cart-blue.svg"
              alt="Logo del carrito de compras"
              className="w-6 h-6"
            />
          </li>
        </Link>
      </ul>

      <Login
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        className={`transition-opacity duration-300 ease-in-out ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <UserModal isOpen={userModalOpen} onClose={handleCloseUser} />
    </nav>
  );
};

export default NavBarDesktopDB;
