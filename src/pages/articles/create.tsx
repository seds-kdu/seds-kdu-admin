import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useNavigation } from "@refinedev/core";
import { ImageUploader } from "../../components/image-uploader";

export const ArticlesCreate = () => {
  const { list } = useNavigation();
  const {
    register,
    handleSubmit,
    control,
    refineCore: { onFinish },
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div style={{ padding: 16, maxWidth: 600 }}>
      <h1>Write Article</h1>
      <form onSubmit={handleSubmit(onFinish)}>

        <div style={{ marginBottom: 12 }}>
          <label>Title</label><br />
          <input
            {...register("title", { required: "Title is required" })}
            style={{ width: "100%", padding: 6 }}
          />
          {errors.title && (
            <p style={{ color: "red" }}>{String(errors.title.message)}</p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Author</label><br />
          <input
            {...register("author")}
            style={{ width: "100%", padding: 6 }}
          />
        </div>

        {/* Drag-and-drop cover image uploader */}
        <Controller
          control={control}
          name="cover_image_url"
          render={({ field }) => (
            <ImageUploader
              label="Cover Image"
              field="articles"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <div style={{ marginBottom: 12 }}>
          <label>Content</label><br />
          <textarea
            {...register("content")}
            rows={8}
            style={{ width: "100%", padding: 6 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Published At</label><br />
          <input
            type="date"
            {...register("published_at")}
            style={{ width: "100%", padding: 6 }}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Publish"}
        </button>{" "}
        <button type="button" onClick={() => list("articles")}>
          Cancel
        </button>
      </form>
    </div>
  );
};
