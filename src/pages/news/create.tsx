import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useNavigation } from "@refinedev/core";
import { ImageUploader } from "../../components/image-uploader";

export const NewsCreate = () => {
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
          <h1 className="page-title">Publish News Article</h1>
          <p className="page-subtitle">Create a news update or press release</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Article Title <span className="required">*</span>
              </label>
              <input
                className="form-input"
                {...register("title", { required: "Title is required" })}
                placeholder="News headline"
              />
              {errors.title && (
                <span className="form-error">{String(errors.title.message)}</span>
              )}
            </div>

            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Author / Division</label>
                <input
                  className="form-input"
                  {...register("author")}
                  placeholder="e.g. Satellite & IT Division"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Publish Date</label>
                <input className="form-input" type="date" {...register("date")} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Excerpt / Summary</label>
              <textarea
                className="form-textarea"
                {...register("excerpt")}
                rows={2}
                placeholder="Short summary for card previews..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Full Article Body</label>
              <textarea
                className="form-textarea"
                {...register("content")}
                rows={6}
                placeholder="Full article content..."
              />
            </div>

            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <ImageUploader
                  label="Cover Image"
                  field="news"
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
                {isSubmitting ? "Publishing…" : "✓ Publish Article"}
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => list("news")}
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
