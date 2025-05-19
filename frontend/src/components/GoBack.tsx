import { useNavigate } from "@tanstack/react-router";

const GoBack: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p
        onClick={() => navigate({ to: "/", replace: true })}
        className="flex cursor-pointer text-indigo-600"
      >
        Go Back
      </p>
    </div>
  );
};

export default GoBack;
