import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";

export const TimelineEventsEdit = () => {
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
          <h1 className="page-title">Edit Timeline Event</h1>
          <p className="page-subtitle">Update milestone details</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        {isLoading ? (
          <div className="form-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ height: 38 }} />
            ))}
          </div>
        ) : (
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
                  />
                  {errors.year && (
                    <span className="form-error">
                      {String(errors.year.message)}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Display Order</label>
                  <input
                    className="form-input"
                    type="number"
                    {...register("sort_order", { valueAsNumber: true })}
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
                />
                {errors.title && (
                  <span className="form-error">
                    {String(errors.title.message)}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Description / Achievements</label>
                <textarea
                  className="form-textarea"
                  {...register("description")}
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
                  onClick={() => list("timeline_events")}
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
