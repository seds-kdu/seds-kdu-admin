import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";

export const CoreValuesCreate = () => {
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
          <h1 className="page-title">Add Core Value</h1>
          <p className="page-subtitle">Add a organizational core value</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="form-grid">
            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">
                  Title <span className="required">*</span>
                </label>
                <input
                  className="form-input"
                  {...register("title", { required: "Title is required" })}
                  placeholder="e.g. Innovation, Teamwork"
                />
                {errors.title && (
                  <span className="form-error">{String(errors.title.message)}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Icon Name</label>
                <input
                  className="form-input"
                  {...register("icon")}
                  placeholder="e.g. Rocket, Star, Heart"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Display Order</label>
              <input
                className="form-input"
                type="number"
                {...register("sort_order", { valueAsNumber: true })}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                {...register("description")}
                rows={4}
                placeholder="Detailed description of this core value..."
              />
            </div>

            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving…" : "✓ Add Core Value"}
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => list("core_values")}
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
