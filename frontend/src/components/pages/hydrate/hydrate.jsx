import { useEffect, useState } from 'react';
import styles from './hydrate.module.css';

import Logo from '@assets/logo/logo'

const messages = [
  "A sudden aura erupted... your inventory awakened with overwhelming power!",
  "The Socks Clan confronted the T-Shirt Squad, one wrong fold, and war would begin.",
  "The Stationery Division activated formation: PEN STRIKE. The notebooks answered with PAPER SHIELD.",
  "In the pantry, the spices revealed their ranks... cinnamon stepped forward as the loudest commander.",
  "From the deepest drawer, forgotten gadgets powered on, signals pulsing like a battle horn.",
  "The Miscellaneous Alliance emerged... unorganized, unstoppable, and fueled by pure chaos.",
  "The shelves shook under pressure... memories turned into weapons, and old items demanded respect.",
  "A rogue rubber duck entered the battlefield... and somehow became the final boss.",
  "The duck was defeated... but the battlefield was silent. Something still felt wrong.",
  "In the end... peace returned. Everything was counted... except one legendary item still missing."
];

const Hydrate = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => { 
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % (messages.length));
    }, 3000);

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.hydrate}>
      <h1><Logo style={{ color: 'black', fontSize: '1.8em' }}/></h1>  
      <h2>Loading...</h2>
      <h3>Sorry, this is running on a free-tier server so it may take a moment. While you wait... enjoy a quick read!</h3>
      <div className={styles.story}>
        <img src={`/inventory-story-${index + 1}.jpg`} alt='story panel'/>
        <span><p>{messages[index]}</p></span>
      </div>
      <div className={styles.loadingBar}></div>
    </div>
  )
}

export default Hydrate;