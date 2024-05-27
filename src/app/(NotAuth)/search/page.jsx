import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";

export default function Search() {
  return (
    <ConnectedLayout>
      <div className=" w-11/12  md:w-[700px] mx-auto">
        <form action="">
          <input type="search" placeholder="rechercher" className="input" />
        </form>
        <div className="mt-32 text-center text-thread-gray-light">
          Recherchez des profils à découvrir !
        </div>
      </div>
    </ConnectedLayout>
  );
}
