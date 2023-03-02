import party from 'party-js';

export function showConfetti (button) {
  for (let i = 0; i < 3; i++) {
    party.confetti(button);
  }
}