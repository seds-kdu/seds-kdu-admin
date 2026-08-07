import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useNavigation } from "@refinedev/core";
import { ImageUploader } from "../../components/image-uploader";

export const ProjectsEdit = () => {
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
          <h1 className="page-title">Edit Project</h1>
          <p className="page-subtitle">Update project information and media</p>
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
                  Project Name <span className="required">*</span>
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

              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <input className="form-input" {...register("year")} />
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" {...register("status")}>
                    <option value="Ongoing">🟡 Ongoing</option>
                    <option value="Completed">🟢 Completed</option>
                    <option value="Planned">🔵 Planned</option>
                  </select>
                </div>
              </div>

              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Timeline</label>
                  <input className="form-input" {...register("timeline")} />
                </div>

                <div className="form-group">
                  <label className="form-label">Team Lead(s)</label>
                  <input className="form-input" {...register("team_lead")} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Description</label>
                <textarea
                  className="form-textarea"
                  {...register("short_desc")}
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Description</label>
                <textarea
                  className="form-textarea"
                  {...register("full_desc")}
                  rows={5}
                />
              </div>

              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageUploader
                    label="Project Header Image"
                    field="projects"
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
                  onClick={() => list("projects")}
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
