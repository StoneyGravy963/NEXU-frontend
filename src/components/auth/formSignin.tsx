

export default function FormSignin() {
    return (
        <form className="flex flex-col gap-4 w-80">
            <h2 className="text-2xl font-bold text-center text-white">Iniciar Sesión</h2>
            <input
                type="email"
                placeholder="Correo Electrónico"
                className="p-2 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> 
            <input
                type="password"
                placeholder="Contraseña"
                className="p-2 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="p-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
                Iniciar Sesión
            </button>
        </form>
    );
}