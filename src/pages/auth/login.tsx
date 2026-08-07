import { useState } from "react";
import { useLogin } from "@refinedev/core";
import "./login.css";

export const LoginPage = () => {
  const { mutate: login, isPending } = useLogin<{ email: string; password: string }>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    login(
      { email, password },
      {
        onError: (err: Error | { message?: string }) => {
          setError(err?.message ?? "Invalid email or password");
        },
      }
    );
  };

  return (
    <div className="login-root">
      {/* Animated background orbs */}
      <div className="login-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Grid overlay */}
      <div className="login-grid" />

      <div className="login-card">
        {/* Logo / Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <span className="login-logo-icon">🛸</span>
          </div>
          <h1 className="login-title">SEDS KDU</h1>
          <p className="login-subtitle">Admin Portal</p>
        </div>

        {/* Divider */}
        <div className="login-divider">
          <span>Sign in to continue</span>
        </div>

        {/* Error banner */}
        {error && (
          <div className="login-error">
            <span>⚠</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="login-email" className="login-label">
              Email address
            </label>
            <div className="login-input-wrap">
              <span className="login-input-icon">✉</span>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="login-password" className="login-label">
              Password
            </label>
            <div className="login-input-wrap">
              <span className="login-input-icon">🔒</span>
              <input
                id="login-password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPass((s) => !s)}
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button
            id="login-submit"
            type="submit"
            className="login-btn"
            disabled={isPending}
          >
            {isPending ? (
              <span className="login-spinner" />
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        <p className="login-footer">
          Space Exploration &amp; Development Society · KDU
        </p>
      </div>
    </div>
  );
};
