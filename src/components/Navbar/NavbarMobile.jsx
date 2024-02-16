const NavbarMobile = () => {
  const hamMenu = document.querySelector("#hamMenu");
  const showMenu = () => {
    hamMenu.classList.toggle("hidden");
  };

  return (
    <nav className="mt-4 md:hidden">
      <ul className="w-screen max-h-[50px] px-2 flex items-center gap-4">
        <li className="mr-auto">
          <img
            src="../../../public/assets/images/logo-karokids.png"
            alt="Logo de KaroKids"
            className="w-[187px]"
          />
        </li>
        <li>
          <img
            src="../../../public/assets/navbar-icons/search.svg"
            alt="Logo de Busqueda"
            className="w-6 h-6"
          />
        </li>
        <li>
          <img
            src="../../../public/assets/navbar-icons/cart.svg"
            alt="Logo del carrito de compras"
            className="w-6 h-6"
          />
        </li>
        <li onClick={() => showMenu()}>
          <img
            src="../../../public/assets/navbar-icons/ham-menu.svg"
            alt="Logo del Menú desplegable"
            className="w-6 h-6"
          />
        </li>
      </ul>
      <ul
        id="hamMenu"
        className="hidden w-screen h-screen fixed flex flex-col items-center py-8 font-medium text-slate-400 text-2xl gap-4"
      >
        <li className="text-slate-600">Home</li>
        <li>Recién Nacido</li>
        <li>Bebé</li>
        <li>Infantil</li>
        <li>Junior</li>
      </ul>
    </nav>
  );
};

export default NavbarMobile;