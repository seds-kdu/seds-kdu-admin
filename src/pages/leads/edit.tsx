import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";

export const LeadsEdit = () => {
  const { list } = useNavigation();
  const {
    register,
    handleSubmit,
    refineCore: { onFinish, query: queryResult },
    formState: { errors, isSubmitting },
  } = useForm();

  const isLoading = queryResult?.isLoading;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Lead</h1>
          <p className="page-subtitle">Update inquiry status and contact notes</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        {isLoading ? (
          <div className="form-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton" style={{ height: 40 }} />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onFinish)}>
            <div className="form-grid">
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    className="form-input"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <span className="form-error">
                      {String(errors.name.message)}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <span className="form-error">
                      {String(errors.email.message)}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" {...register("phone")} />
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" {...register("status")}>
                    <option value="new">🆕 New</option>
                    <option value="contacted">💬 Contacted</option>
                    <option value="closed">✅ Closed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" {...register("subject")} />
              </div>

              <div className="form-group">
                <label className="form-label">Message / Details</label>
                <textarea
                  className="form-textarea"
                  {...register("message")}
                  rows={4}
                />
              </div>

              <div className="form-actions">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving…" : "✓ Save Changes"}
                </button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => list("leads")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
