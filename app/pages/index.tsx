import "@fontsource/press-start-2p";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-pulse" />
      <div className="relative flex flex-col items-center justify-center h-full">
        <h1 className="text-6xl font-press-start-2p text-neon-green mb-4">stjames.dev</h1>
        <p className="text-xl text-neon-blue">Welcome to my personal site</p>
      </div>
    </div>
  );
};

export default HomePage;

// Add the following CSS to your styles
// .bg-grid-pattern {
//   background-image: url('/path/to/grid-pattern.png');
//   background-size: cover;
// }
// .text-neon-green {
//   color: #39ff14;
// }
// .text-neon-blue {
//   color: #00e5ff;
// }
