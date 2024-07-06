import StudentTable from "../components/tableTemplate/tableTemplate";

// `app/page.tsx` is the UI for the `/` URL
export default function Student() {
  return (
    <>
      <div className="border-4 border-green-200 flex">
        <div className="border-4 border-yellow-200 m-5 w-1/3">
          <div className="border-4 border-red-200 m-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
            similique odio deleniti eligendi beatae nam at repellendus commodi
            eveniet. Aperiam pariatur repellat ea impedit, ipsa quos rerum?
            Illo, impedit inventore.
          </div>
          <div className="border-4 border-purple-300 m-2">
            Lorem ipsum dolor sit amet consectetur adipisicing{" "}
          </div>
        </div>
        <div className="border-4 border-blue-200 m-5 w-2/3">
          <StudentTable />
        </div>
      </div>
    </>
  );
}
