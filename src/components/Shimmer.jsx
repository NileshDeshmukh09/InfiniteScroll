const Shimmer = () => {
    return Array(15)
      .fill(0)
      .map((n, i) => (
        <div key={i} className="p-5 m-5 border bg-gray-200 border-gray-300 rounded-lg">
          <div className="w-36 h-36 bg-gray-200"></div>
        </div>
      ));
  };
  export default Shimmer;
  