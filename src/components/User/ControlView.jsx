import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const ControlView = () => {
	const auth = useAuth();
	const { displayName, email, photoURL, phoneNumber } = auth.user;
	const FirstName = displayName?.split(" ")[0];
	const LastName = displayName?.split(" ").at(-1);
	return (
		<div className="flex flex-col items-center justify-evenly rounded border-2  w-full h-auto md:h-[500px]">
			<div className="mt-4 rounded-full   ">
				{photoURL ? (
					<img
						src={photoURL}
						className="rounded-full w-[200px]  lg:w-[250px]"
					/>
				) : (
					<img
						src="/assets/panel-icons/user-profile.svg"
						className="bg-slate-200 rounded-full w-[200px] md:w-[250px]"
					/>
				)}
			</div>
			<div className="flex flex-col justify-evenly  px-2  w-auto  md:w-auto h-auto xl:h-60 mt-4">
				<div className="flex flex-row ">
					<h1 className="text-base md:text-lg">Nombre:</h1>
					<label className=" text-sm md:text-lg ml-4">{FirstName}</label>
				</div>
				<div className="flex flex-row ">
					<h1 className="text-base md:text-lg">Apellido:</h1>
					<label className=" text-sm md:text-lg ml-4">{LastName}</label>
				</div>
				<div className="flex flex-row ">
					<h1 className="text-base md:text-lg">Email:</h1>
					<label className=" text-sm md:text-lg ml-4">{email}</label>
				</div>
				<div className="flex flex-row ">
					<h1 className="text-base md:text-lg">N° de telefono:</h1>
					<label className=" text-sm md:text-lg ml-4">{phoneNumber}</label>
				</div>
				<Link to="/usuario/datos-personales">
					<Button variant="outline" className="w-full my-2">
						Modificar
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default ControlView;
