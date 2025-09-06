import { Button } from "../../components/button";
import { Input } from "../../components/input";
import med from "../../../assets/med.jpg";
import logo from "../../../assets/logo2.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    // await login("demo@mail.com", "secret");
    // const me = await api.get("/me");
    // console.log(me.data);
    e.preventDefault();
    if (email === "admin@admin.com" && password === "admin") {
      navigate("/dashboard");
      toast.success("Connexion réussie", {
        position: "bottom-right",
      });
    } else {
      toast.error("Email ou mot de passe incorrect", {
        position: "bottom-right",
      });
    }
  };
  return (
    <div className="flex flex-row h-screen">
      <div className="flex-1/2">
        <img
          src={med}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1/2 flex flex-col justify-center">
        <div className="w-96 mx-auto">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-28 w-28 object-contain" />
          </div>
          <h2 className="text-lg font-bold mb-4">Se connecter</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input
              type="email"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Mot de passe
            </label>
            <Input
              type="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="default"
            className="w-full mb-4"
            onClick={handleLogin}
          >
            Se connecter
          </Button>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">ou</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 w-full"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Se connecter avec Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
