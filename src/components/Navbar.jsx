import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import PrimaryBtn from "./PrimaryBtn";
import { Link, useNavigate } from "react-router-dom";
import ShareModal from "./TextEditor/ShareModal";
import SecondaryBtn from "./SecondaryBtn";
import Alert from "./Alert";


const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

const Navbar = ({ handleSaveDocument }) => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [errorFlag, setErrorFlag] = useState(false);
  

  return (
    <>
    <Alert
            msg={"Login to continue"}
            description={"You are not logged in to continue this step"}
            visible={errorFlag}
            setVisible={setErrorFlag}
            theme="error"
            duration={4000}
          /> 
      <header className="absolute inset-x-0 top-0 z-40 border-b border-slate-200 bg-white">
        <nav
          aria-label="Global"
          className="relative isolate flex items-center justify-between p-3 lg:px-8 overflow-hidden"
        >
          <Link to={"/"}>
            <div className="flex items-center lg:flex-1 space-x-1 text-sky-600">
              <span
                class="material-symbols-outlined"
                style={{ fontSize: "40px" }}
              >
                description
              </span>
              <span>CollabAI</span>
            </div>
          </Link>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <SecondaryBtn
                onclick={() => {
                  setOpenModal(true);
                }}
                classname="flex items-center justify-center rounded-full h-9 w-9"
              >
                <span
                  class="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  share
                </span>
              </SecondaryBtn>
            </div>
            <div>
              <PrimaryBtn
                classname="shadow-lg"
                onclick={() =>{ 
                  if (!JSON.parse(localStorage.getItem("user"))) {
        setErrorFlag(true);
        return;
      }
                  navigate("/mydocs")
                }}
              >
                <div className="flex items-center">My docs</div>
              </PrimaryBtn>
            </div>
            <div className="lg:flex lg:flex-1 lg:justify-end">
              <PrimaryBtn classname="shadow-lg" onclick={handleSaveDocument}>
                <div className="flex items-center">
                  Save
                  <span
                    class="material-symbols-outlined"
                    style={{ fontSize: "18px", marginLeft: "8px" }}
                  >
                    upload
                  </span>
                </div>
              </PrimaryBtn>
            </div>
          </div>
        </nav>

        <Dialog open={openMenu} onClose={setOpenMenu} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <ShareModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Navbar;
