import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";

export const LeadsCreate = () => {
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
          <h1 className="page-title">Add Lead / Inquiry</h1>
          <p className="page-subtitle">Manually record a new lead or contact inquiry</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
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
                  placeholder="Inquirer name"
                />
                {errors.name && (
                  <span className="form-error">{String(errors.name.message)}</span>
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
                  placeholder="inquirer@example.com"
                />
                {errors.email && (
                  <span className="form-error">{String(errors.email.message)}</span>
                )}
              </div>
            </div>

            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  className="form-input"
                  {...register("phone")}
                  placeholder="+94 77 123 4567"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select" {...register("status")} defaultValue="new">
                  <option value="new">🆕 New</option>
                  <option value="contacted">💬 Contacted</option>
                  <option value="closed">✅ Closed</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                className="form-input"
                {...register("subject")}
                placeholder="Inquiry topic or title"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message / Details</label>
              <textarea
                className="form-textarea"
                {...register("message")}
                rows={4}
                placeholder="Message body or internal notes..."
              />
            </div>

            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving…" : "✓ Add Lead"}
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
      </div>
    </div>
  );
};
