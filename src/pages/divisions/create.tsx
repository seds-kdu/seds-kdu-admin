import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useNavigation } from "@refinedev/core";
import { ImageUploader } from "../../components/image-uploader";

export const DivisionsCreate = () => {
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
          <h1 className="page-title">Add Division</h1>
          <p className="page-subtitle">Create a new organizational division</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="form-grid">
            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">
                  Division Name <span className="required">*</span>
                </label>
                <input
                  className="form-input"
                  {...register("name", { required: "Name is required" })}
                  placeholder="e.g. Aeronautical"
                />
                {errors.name && (
                  <span className="form-error">{String(errors.name.message)}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Icon Name</label>
                <input
                  className="form-input"
                  {...register("icon")}
                  placeholder="e.g. Plane, Rocket, Satellite"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Brand Color Code</label>
              <input
                className="form-input"
                type="text"
                {...register("color")}
                placeholder="#00E5FF"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Short Description</label>
              <textarea
                className="form-textarea"
                {...register("short_desc")}
                rows={2}
                placeholder="Brief summary..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Full Description</label>
              <textarea
                className="form-textarea"
                {...register("full_desc")}
                rows={4}
                placeholder="Full description of the division..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Who Should Join?</label>
              <textarea
                className="form-textarea"
                {...register("who_should_join")}
                rows={2}
                placeholder="Target students..."
              />
            </div>

            <h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 12, borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
              Leadership Details
            </h3>

            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Lead Name</label>
                <input className="form-input" {...register("lead_name")} />
              </div>
              <div className="form-group">
                <label className="form-label">Lead Faculty</label>
                <input className="form-input" {...register("lead_faculty")} />
              </div>
            </div>

            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Co-Lead Name</label>
                <input className="form-input" {...register("colead_name")} />
              </div>
              <div className="form-group">
                <label className="form-label">Co-Lead Faculty</label>
                <input className="form-input" {...register("colead_faculty")} />
              </div>
            </div>

            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <ImageUploader
                  label="Division Image"
                  field="divisions"
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
                {isSubmitting ? "Saving…" : "✓ Add Division"}
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => list("divisions")}
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
