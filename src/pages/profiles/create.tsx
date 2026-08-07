import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";

export const ProfilesCreate = () => {
  const { list } = useNavigation();
  const {
    register,
    handleSubmit,
    refineCore: { onFinish },
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add User Profile</h1>
          <p className="page-subtitle">Create an admin user account profile</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Name <span className="required">*</span>
              </label>
              <input
                className="form-input"
                {...register("name", { required: "Name is required" })}
                placeholder="User name"
              />
              {errors.name && (
                <span className="form-error">{String(errors.name.message)}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                className="form-input"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="user@kdu.ac.lk"
              />
              {errors.email && (
                <span className="form-error">{String(errors.email.message)}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Admin Role</label>
              <select className="form-select" {...register("role")} defaultValue="editor">
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>

            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving…" : "✓ Add Profile"}
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => list("profiles")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
