import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useNavigation } from "@refinedev/core";
import { ImageUploader } from "../../components/image-uploader";

export const TeamMembersEdit = () => {
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
          <h1 className="page-title">Edit Team Member</h1>
          <p className="page-subtitle">Update member details and profile photo</p>
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

              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Role / Position</label>
                  <input className="form-input" {...register("role")} />
                </div>

                <div className="form-group">
                  <label className="form-label">Faculty / Department</label>
                  <input className="form-input" {...register("faculty")} />
                </div>
              </div>

              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    className="form-input"
                    type="email"
                    {...register("email")}
                  />
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
                <label className="form-label">Bio / Summary</label>
                <textarea
                  className="form-textarea"
                  {...register("bio")}
                  rows={3}
                />
              </div>

              <Controller
                control={control}
                name="photo"
                render={({ field }) => (
                  <ImageUploader
                    label="Profile Photo"
                    field="team_members"
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
                  onClick={() => list("team_members")}
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
