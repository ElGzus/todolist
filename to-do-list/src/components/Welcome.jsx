import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import "./welcome.css"

export function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/to-do-list/src/components/HomePage.jsx");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/to-do-list/src/components/HomePage.jsx");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm that emails are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm that passwords are the same");
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/to-do-list/src/components/HomePage.jsx");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <div className="container mt-5 card text-bg-dark">
        <h1 className="mb-4 display-8">To do List App</h1>
        <div className="row justify-content-center">
          <div className="col-md-12">
            {isRegistering ? (
              <>
                <h2>Registro</h2>
                <div className="mb-3 row">
                  <div className="col-sm-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Ingrese su email"
                      value={registerInformation.email}
                      onChange={(e) =>
                        setRegisterInformation({
                          ...registerInformation,
                          email: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-sm-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Confirmar email"
                      value={registerInformation.confirmEmail}
                      onChange={(e) =>
                        setRegisterInformation({
                          ...registerInformation,
                          confirmEmail: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-sm-12">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Escribir contraseña"
                      value={registerInformation.password}
                      onChange={(e) =>
                        setRegisterInformation({
                          ...registerInformation,
                          password: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-sm-12">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirmar contraseña"
                      value={registerInformation.confirmPassword}
                      onChange={(e) =>
                        setRegisterInformation({
                          ...registerInformation,
                          confirmPassword: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-sm-12 offset-sm-2">
                    <button
                      onClick={handleRegister}
                      className="btn btn-primary"
                    >
                      Registrarse
                    </button>
                    <button
                      onClick={() => setIsRegistering(false)}
                      className="btn btn-warning"
                    >
                      Atrás
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-bg-secondary">
                <h2>Ingreso</h2>
                <div className="mb-3 row">
                  <div className="col-sm-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Ingrese su email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-sm-12">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Escribir contraseña"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-sm-12 offset-sm-2">
                    <button
                      onClick={handleSignIn}
                      className="btn btn-success"
                    >
                      Ingresar
                    </button>
                    <button
                      onClick={() => setIsRegistering(true)}
                      className="btn btn-warning"
                    >
                      Crear una cuenta
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
