import { useState } from "react";

function TopNavBar() {
  const [showBanner, setShowBanner] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("your-email@example.com");
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 2000);
  };

  return (
    <div>
      <button onClick={copyEmailToClipboard} className="text-foreground hover:text-emerald-500 transition-colors">
        Email
      </button>
      {showBanner && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-white p-2 rounded">Email copied to clipboard</div>
      )}
    </div>
  );
}

export default TopNavBar;
