import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useNavigation } from "@refinedev/core";
import { ImageUploader } from "../../components/image-uploader";

export const GalleryEdit = () => {
  const { list } = useNavigation();
  const {
    register,
    handleSubmit,
    control,
    refineCore: { onFinish, query: queryResult },
    formState: { isSubmitting },
  } = useForm();

  const isLoading = queryResult?.isLoading;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Gallery Item</h1>
          <p className="page-subtitle">Update photo caption and details</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        {isLoading ? (
          <div className="form-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ height: 40 }} />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onFinish)}>
            <div className="form-grid">
              <Controller
                control={control}
                name="url"
                render={({ field }) => (
                  <ImageUploader
                    label="Gallery Image"
                    field="gallery"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <div className="form-group">
                <label className="form-label">Caption / Description</label>
                <input className="form-input" {...register("caption")} />
              </div>

              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input className="form-input" {...register("category")} />
                </div>

                <div className="form-group">
                  <label className="form-label">Associated Event</label>
                  <input className="form-input" {...register("event_name")} />
                </div>
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
                  onClick={() => list("gallery")}
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
