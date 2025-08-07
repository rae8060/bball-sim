import React, { useState } from 'react';
import { Stage, Layer, Circle, Text, Arrow } from 'react-konva';

const initialPlayers = [
  { id: 1, x: 100, y: 100, label: 'PG' },
  { id: 2, x: 200, y: 100, label: 'SG' },
  { id: 3, x: 300, y: 100, label: 'SF' },
  { id: 4, x: 100, y: 200, label: 'PF' },
  { id: 5, x: 200, y: 200, label: 'C' }
];

export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [lines, setLines] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleDragMove = (e, id) => {
    const { x, y } = e.target.position();
    setPlayers(players.map(p => (p.id === id ? { ...p, x, y } : p)));
  };

  const handleClick = (player) => {
    if (selected === null) {
      setSelected(player);
    } else {
      setLines([...lines, { from: selected, to: player }]);
      setSelected(null);
    }
  };

  return (
    <div className="App">
      <h2 style={{ textAlign: 'center', padding: '10px' }}>Basketball Coaching App</h2>
      <Stage width={window.innerWidth} height={window.innerHeight - 80}>
        <Layer>
          {players.map((player) => (
            <>
              <Circle
                key={player.id}
                x={player.x}
                y={player.y}
                radius={25}
                fill="blue"
                draggable
                onDragMove={(e) => handleDragMove(e, player.id)}
                onClick={() => handleClick(player)}
              />
              <Text
                text={player.label}
                x={player.x - 10}
                y={player.y - 10}
                fontSize={16}
                fill="white"
              />
            </>
          ))}

          {lines.map((line, i) => (
            <Arrow
              key={i}
              points={[line.from.x, line.from.y, line.to.x, line.to.y]}
              stroke="yellow"
              strokeWidth={3}
              pointerLength={10}
              pointerWidth={10}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
