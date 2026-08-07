import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useNavigation } from "@refinedev/core";
import { ImageUploader } from "../../components/image-uploader";

export const ProjectsCreate = () => {
  const { list } = useNavigation();
  const {
    register,
    handleSubmit,
    control,
    refineCore: { onFinish },
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add Project</h1>
          <p className="page-subtitle">Create a new technical or research project</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Project Name <span className="required">*</span>
              </label>
              <input
                className="form-input"
                {...register("name", { required: "Project name is required" })}
                placeholder="e.g. AstroFocus"
              />
              {errors.name && (
                <span className="form-error">{String(errors.name.message)}</span>
              )}
            </div>

            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Year</label>
                <input
                  className="form-input"
                  {...register("year")}
                  placeholder="e.g. 2025"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select" {...register("status")} defaultValue="Ongoing">
                  <option value="Ongoing">🟡 Ongoing</option>
                  <option value="Completed">🟢 Completed</option>
                  <option value="Planned">🔵 Planned</option>
                </select>
              </div>
            </div>

            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Timeline</label>
                <input
                  className="form-input"
                  {...register("timeline")}
                  placeholder="e.g. Annual Competition"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Team Lead(s)</label>
                <input
                  className="form-input"
                  {...register("team_lead")}
                  placeholder="e.g. Nimesh Jayasooriya"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Short Description</label>
              <textarea
                className="form-textarea"
                {...register("short_desc")}
                rows={2}
                placeholder="Brief summary for project cards..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Full Description</label>
              <textarea
                className="form-textarea"
                {...register("full_desc")}
                rows={5}
                placeholder="Comprehensive project description, objectives, and scope..."
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
                {isSubmitting ? "Saving…" : "✓ Create Project"}
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
      </div>
    </div>
  );
};
