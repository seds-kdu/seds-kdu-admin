import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useNavigation } from "@refinedev/core";
import { ImageUploader } from "../../components/image-uploader";

export const GalleryCreate = () => {
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
          <h1 className="page-title">Add Gallery Photo</h1>
          <p className="page-subtitle">Upload a photo to the SEDS gallery</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="form-grid">
            <Controller
              control={control}
              name="url"
              rules={{ required: "Image is required" }}
              render={({ field }) => (
                <ImageUploader
                  label="Gallery Image *"
                  field="gallery"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.url && (
              <span className="form-error">{String(errors.url.message)}</span>
            )}

            <div className="form-group">
              <label className="form-label">Caption / Title</label>
              <input
                className="form-input"
                {...register("caption")}
                placeholder="Photo caption or description..."
              />
            </div>

            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  className="form-input"
                  {...register("category")}
                  placeholder="e.g. Events, Workshops, Rocketry"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Associated Event</label>
                <input
                  className="form-input"
                  {...register("event_name")}
                  placeholder="e.g. Neiburush 2.0"
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving…" : "✓ Upload Photo"}
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => list("gallery")}
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
