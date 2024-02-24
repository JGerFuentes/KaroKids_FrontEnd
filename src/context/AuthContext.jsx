import { auth } from "../firebase/firebase.config.js";
import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	updateProfile,
	EmailAuthProvider,
	reauthenticateWithCredential,
	updatePassword,
} from "firebase/auth";
import Swal from "sweetalert2";
import "./AuthContext.css";

export const authContext = createContext();

export const useAuth = () => {
	const context = useContext(authContext);
	if (!context) {
		console.log("error creating auth context");
	}
	return context;
};

export function AuthProvider({ children }) {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
		customClass: {
			popup: "my-toast",
		},
	});

	const [user, setUser] = useState("");
	useEffect(() => {
		const suscribed = onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) {
				setUser("");
			} else {
				setUser(currentUser);
			}
		});
		return () => suscribed();
	}, []);

	const handleChangePassword = async (currentPassword, newPassword) => {
		try {
			if (!auth.currentUser) {
				Toast.fire({
					icon: "error",
					title: "No hay una cuenta logueada.",
				});
			}

			const credential = EmailAuthProvider.credential(
				auth.currentUser.email,
				currentPassword
			);
			await reauthenticateWithCredential(auth.currentUser, credential);
			await passwordUpdate(auth.currentUser, newPassword);
			Toast.fire({
				icon: "success",
				title: "Contraseña cambiada exitosamente.",
			});
		} catch (error) {
			if (error.code === "auth/invalid-credential") {
				Toast.fire({
					icon: "error",
					title: "Contraseña incorrecta.",
				});
			} else {
				Toast.fire({
					icon: "error",
					title: "No se pudo cambiar la contraseña.",
				});
			}
		}
	};

	const passwordUpdate = async (usuario, newPassword) => {
		try {
			await updatePassword(usuario, newPassword);
		} catch (error) {
			console.log("No se pudo actualizar la contraseña");
			throw error;
		}
	};

	const register = async (email, password, displayName, onClose) => {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await updateDisplayName(response.user, displayName);
			Swal.fire({
				title: "Registro finalizado!",
				text: "Te has registrado correctamente.",
				icon: "success",
			});
			onClose();
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Este correo ya se encuentra registrado",
			});
		}
	};

	const updateDisplayName = async (user, displayName) => {
		try {
			await updateProfile(user, { displayName });
		} catch (error) {
			console.log("No se pudo actualizar el display name");
		}
	};

	const login = async (email, password, onClose) => {
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);
			onClose();
			Toast.fire({
				icon: "success",
				title: "Has ingresado exitosamente.",
			});
		} catch (error) {
			console.log(error);
			if (error.code === "auth/wrong-password") {
				Toast.fire({
					icon: "error",
					title: "Contraseña incorrecta.",
				});
			} else {
				Toast.fire({
					icon: "error",
					title: "Error al iniciar sesión.",
				});
			}
		}
	};

	const loginWithGoogle = async () => {
		try {
			const responseGoogle = new GoogleAuthProvider();
			await signInWithPopup(auth, responseGoogle);
			Toast.fire({
				icon: "success",
				title: "Has ingresado exitosamente.",
			});
		} catch (error) {
			console.log(error);
		}
	};

	const registerWithGoogle = async () => {
		try {
			const responseGoogle = new GoogleAuthProvider();
			await signInWithPopup(auth, responseGoogle);
			Swal.fire({
				title: "Registro finalizado!",
				text: "Te has registrado correctamente.",
				icon: "success",
			});
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async (onClose) => {
		try {
			const response = await signOut(auth);
			Toast.fire({
				icon: "success",
				title: "Sesión finalizada con éxito.",
			});
			onClose();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<authContext.Provider
			value={{
				register,
				login,
				loginWithGoogle,
				registerWithGoogle,
				logout,
				user,
				handleChangePassword,
			}}>
			{children}
		</authContext.Provider>
	);
}
