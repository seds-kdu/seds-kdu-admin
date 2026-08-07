import { useForm } from "@refinedev/react-hook-form";
export const AboutContentEdit = () => {
  const {
    register,
    handleSubmit,
    refineCore: { onFinish, query: queryResult },
    formState: { isSubmitting },
  } = useForm({
    refineCoreProps: {
      action: "edit",
      resource: "about_content",
      id: "1",
    },
  });

  const isLoading = queryResult?.isLoading;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit About Us Content</h1>
          <p className="page-subtitle">Manage public About page text sections</p>
        </div>
      </div>

      <div className="card form-card" style={{ padding: 28 }}>
        {isLoading ? (
          <div className="form-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton" style={{ height: 48 }} />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onFinish)}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Mission Statement</label>
                <textarea
                  className="form-textarea"
                  {...register("mission")}
                  rows={3}
                  placeholder="Our mission..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Overview</label>
                <textarea
                  className="form-textarea"
                  {...register("overview")}
                  rows={4}
                  placeholder="General SEDS KDU overview..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">About SEDS Global</label>
                <textarea
                  className="form-textarea"
                  {...register("about_seds")}
                  rows={4}
                  placeholder="About the global SEDS organization..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">About SEDS KDU Chapter</label>
                <textarea
                  className="form-textarea"
                  {...register("about_seds_kdu")}
                  rows={4}
                  placeholder="About the KDU chapter specifically..."
                />
              </div>

              <div className="form-actions">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving…" : "✓ Save Changes"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
