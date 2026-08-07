import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useNavigation } from "@refinedev/core";
import { ImageUploader } from "../../components/image-uploader";

export const DivisionsEdit = () => {
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
          <h1 className="page-title">Edit Division</h1>
          <p className="page-subtitle">Update division information and leadership</p>
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
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Division Name <span className="required">*</span>
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
                  <label className="form-label">Icon Name</label>
                  <input className="form-input" {...register("icon")} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Brand Color Code</label>
                <input className="form-input" {...register("color")} />
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
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Who Should Join?</label>
                <textarea
                  className="form-textarea"
                  {...register("who_should_join")}
                  rows={2}
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
                  {isSubmitting ? "Saving…" : "✓ Save Changes"}
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
        )}
      </div>
    </div>
  );
};
