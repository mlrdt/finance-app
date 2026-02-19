export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#ff0000",
        fontFamily: '"Press Start 2P", monospace',
        fontSize: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: 0,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
      `}</style>
      Hello World
    </div>
  );
}
