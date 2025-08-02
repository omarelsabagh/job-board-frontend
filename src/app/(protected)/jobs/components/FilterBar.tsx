const FilterBar = ({
  location,
  setLocation,
  status,
  setStatus,
  setPage,
}: {
  location: string | null;
  setLocation: (location: string | null) => void;
  status: string | null;
  setStatus: (status: string | null) => void;
  setPage: (page: number) => void;
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      <select
        value={location ?? ""}
        onChange={(e) => {
          setPage(1);
          setLocation(e.target.value || null);
        }}
        className="border p-2 rounded"
      >
        <option value="">All Locations</option>
        <option value="Cairo">Cairo</option>
        <option value="Alexandria">Alexandria</option>
        <option value="Giza">Giza</option>
        <option value="Remote">Remote</option>
      </select>

      <select
        value={status ?? ""}
        onChange={(e) => {
          setPage(1);
          setStatus(e.target.value || null);
        }}
        className="border p-2 rounded"
      >
        <option value="">All Statuses</option>
        <option value="OPEN">Open</option>
        <option value="CLOSED">Closed</option>
      </select>
    </div>
  );
};
export default FilterBar;
