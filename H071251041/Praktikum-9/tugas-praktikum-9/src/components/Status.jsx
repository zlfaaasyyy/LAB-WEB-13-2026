function Status({ tersedia }) {
  if (tersedia) {
    return (
      <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        Tersedia
      </span>
    );
  } else {
    return (
      <span className="shrink-0 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        Sedang Dipinjam
      </span>
    );
  }
}

export default Status;
