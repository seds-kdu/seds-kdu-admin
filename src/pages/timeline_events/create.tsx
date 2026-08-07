import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";

export const TimelineEventsCreate = () => {
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
          <h1 className="page-title">Add Timeline Event</h1>
          <p className="page-subtitle">Add a historical milestone to the SEDS timeline</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="form-grid">
            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">
                  Year / Date Span <span className="required">*</span>
                </label>
                <input
                  className="form-input"
                  {...register("year", { required: "Year is required" })}
                  placeholder="e.g. 2022 - 2023 or 2024"
                />
                {errors.year && (
                  <span className="form-error">{String(errors.year.message)}</span>
                )}
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
            </div>

            <div className="form-group">
              <label className="form-label">
                Milestone Title <span className="required">*</span>
              </label>
              <input
                className="form-input"
                {...register("title", { required: "Title is required" })}
                placeholder="e.g. Chapter Foundation & Establishment"
              />
              {errors.title && (
                <span className="form-error">{String(errors.title.message)}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Description / Achievements</label>
              <textarea
                className="form-textarea"
                {...register("description")}
                rows={4}
                placeholder="Describe what occurred during this milestone..."
              />
            </div>

            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving…" : "✓ Add Timeline Event"}
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => list("timeline_events")}
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
