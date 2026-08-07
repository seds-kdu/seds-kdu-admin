import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useNavigation } from "@refinedev/core";
import { ImageUploader } from "../../components/image-uploader";

export const TeamMembersCreate = () => {
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
          <h1 className="page-title">Add Team Member</h1>
          <p className="page-subtitle">Create a new committee or executive member</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                className="form-input"
                {...register("name", { required: "Name is required" })}
                placeholder="e.g. I.R.G. Dulhitha"
              />
              {errors.name && (
                <span className="form-error">{String(errors.name.message)}</span>
              )}
            </div>

            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Role / Position</label>
                <input
                  className="form-input"
                  {...register("role")}
                  placeholder="e.g. President, Vice President"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Faculty / Intake</label>
                <input
                  className="form-input"
                  {...register("faculty")}
                  placeholder="e.g. Faculty of Engineering, Intake 39"
                />
              </div>
            </div>

            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  {...register("email")}
                  placeholder="member@kdu.ac.lk"
                />
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
              <label className="form-label">Bio / Profile Summary</label>
              <textarea
                className="form-textarea"
                {...register("bio")}
                rows={3}
                placeholder="Brief introduction..."
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
                {isSubmitting ? "Saving…" : "✓ Add Member"}
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
      </div>
    </div>
  );
};
