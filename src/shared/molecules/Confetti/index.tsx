import { useEffect, useState } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';

import { type ConfettiProps } from './types';

const Confetti = ({ showConfetti, autoStart = true, onConfettiEnd }: ConfettiProps) => {
  const [confettiVisible, setConfettiVisible] = useState(showConfetti);

  useEffect(() => {
    setConfettiVisible(showConfetti);
  }, [showConfetti]);

  const onAnimationEnd = () => {
    setConfettiVisible(false);
    onConfettiEnd?.();
  };

  return (
    <>
      {confettiVisible && (
        <ConfettiCannon
          count={300}
          origin={{ x: -10, y: 0 }}
          fallSpeed={5000}
          fadeOut={true}
          autoStart={autoStart}
          onAnimationEnd={onAnimationEnd}
        />
      )}
    </>
  );
};

export default Confetti;
