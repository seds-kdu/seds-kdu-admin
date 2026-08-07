import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useNavigation } from "@refinedev/core";
import { ImageUploader } from "../../components/image-uploader";

export const EventsEdit = () => {
  const { list } = useNavigation();
  const {
    register,
    handleSubmit,
    control,
    refineCore: { onFinish, query: queryResult },
    formState: { errors, isSubmitting },
  } = useForm();

  const isLoading = queryResult?.isLoading;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Event</h1>
          <p className="page-subtitle">Update event details and banner</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        {isLoading ? (
          <div className="form-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton" style={{ height: 38 }} />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onFinish)}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Event Name <span className="required">*</span>
                </label>
                <input
                  className="form-input"
                  {...register("name", { required: "Event name is required" })}
                />
                {errors.name && (
                  <span className="form-error">
                    {String(errors.name.message)}
                  </span>
                )}
              </div>

              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input className="form-input" type="date" {...register("date")} />
                </div>

                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input className="form-input" type="text" {...register("time")} />
                </div>
              </div>

              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Venue / Location</label>
                  <input className="form-input" {...register("venue")} />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input className="form-input" {...register("category")} />
                </div>
              </div>

              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Organizing Division</label>
                  <input className="form-input" {...register("division_id")} />
                </div>

                <div className="form-group" style={{ justifyContent: "center" }}>
                  <label className="form-label" style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginTop: 24 }}>
                    <input
                      type="checkbox"
                      {...register("is_upcoming")}
                      style={{ width: 18, height: 18 }}
                    />
                    <span>Mark as Upcoming Event</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Description</label>
                <textarea
                  className="form-textarea"
                  {...register("description")}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Overview / Details</label>
                <textarea
                  className="form-textarea"
                  {...register("overview")}
                  rows={5}
                />
              </div>

              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageUploader
                    label="Event Banner Image"
                    field="events"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

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
                  onClick={() => list("events")}
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
