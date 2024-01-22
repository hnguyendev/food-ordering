import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      PageNotFound
      <button onClick={() => navigate(-1)} className="hover:underline block">
        &larr; Return
      </button>
    </div>
  );
};

export default PageNotFound;
