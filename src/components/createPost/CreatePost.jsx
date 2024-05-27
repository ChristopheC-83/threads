import NewPostForm from "./NewPostForm";

export default function CreatePost() {
  return (
    <div className="flex gap-5 py-4 duration-150 border-b border-threads-gray-dark  w-11/12  md:w-[700px] mx-auto ">
      <div className="w-full ">
        <NewPostForm />
      </div>
    </div>
  );
}
