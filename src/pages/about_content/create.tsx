import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
export const AboutContentCreate = () => {
  const { list } = useNavigation();
  const { register, handleSubmit, refineCore: { onFinish }, formState: { isSubmitting } } = useForm();
  return (
    <div style={{ padding: 16, maxWidth: 600 }}>
      <h1>Create About Content</h1>
      <form onSubmit={handleSubmit(onFinish)}>
        <div style={{ marginBottom: 12 }}><label>Name / Title</label><br /><input {...register("title")} style={{ width: '100%', padding: 6 }} /></div>
        <div style={{ marginBottom: 12 }}><label>Description / Content</label><br /><textarea {...register("description")} rows={4} style={{ width: '100%', padding: 6 }} /></div>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</button>{' '}
        <button type="button" onClick={() => list('about_content')}>Cancel</button>
      </form>
    </div>
  );
};
