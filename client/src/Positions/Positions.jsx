
import { useState } from 'react';
import './Positions.css';

function Positions() {
  return (
    <div className="positions-container">
      <ul className='positions'>
      <li className='position'>
          <div className='image'>
          <img src="../public/commander.png" alt="" />
          </div>
          <div className='details'>
            <h3>Crew Commander<span id="colon">:</span></h3>
            <p>
                Lead our team as the Crew Commander, overseeing all operations and ensuring the success of every mission. This role requires exceptional leadership skills, strategic thinking, and the ability to make critical decisions under pressure. As the backbone of the crew, you will inspire and guide your team to achieve greatness.
            </p>
          </div>
        </li>
        <li className='position'>
          <div className='image'>
            <img src="../public/pofg.jpeg" alt="" />
          </div>
          <div className='details'>
            <h3>Purveyor of Fine Goods:</h3>
            <p>
            The Purveyor will be responsible for curating a selection of luxurious and exclusive items, ranging from exquisite snacks and rare collectibles to unique artisan knick-knacks. Your goal will be to provide exceptional service and create an elevated experience for both crew and passengers, ensuring that every journey is complemented by the finest offerings available.
            </p>
          </div>
        </li>
        <li className='position'>
          <div className='image'>
              <img src="../public/linguistics.png" alt="" />
            </div>
          <div className='details'>
            <h3>Linguist:</h3>
            <p>
              The Linguist will serve as the primary expert in language translation, cultural liaison, and communication support across a variety of operational environments. This position demands fluency in multiple languages, a strong understanding of military protocols, and the ability to perform effectively under pressure to ensure seamless and secure communication between crew members, allied forces, and local populations.
            </p>
          </div>
        </li>
        <li className='position'>
          <div className='image'>
              <img src="../public/cook.webp" alt="" />
            </div>
          <div className='details'>
            <h3>Cook:</h3>
            <p>
              You cook and you know things. The cook's duties are to prepare meals that are both nutritious and delicious, tailored to the unique needs of space travel. In this role, you will be responsible for creating meals according to the onboard menu, ensuring timely delivery and high-quality standards. You will work in a compact and high-tech kitchen environment, where precision, organization, and creativity are key.
            </p>
          </div>
        </li>
        <li className='position'>
          <div className='image'>
            <img src="../public/deckhand.avif" alt="" />
          </div>
          <div className='details'>
            <h3>Deckhand:</h3>
            <p>
              The Deckhand is an essential part of our operations. Your responsibilities will include maintaining the ship, assisting with cargo handling, and ensuring the safety of all crew members. This role requires physical stamina, a strong work ethic, and a willingness to learn the ropes of life at sea—or in space!
            </p>
          </div>
        </li>
        <li className='position'>
          <div className='image'>
            <img src="../public/surgeon.jpg" alt="" />
          </div>
          <div className='details'>
            <h3>Space Surgeon:</h3>
            <p>
              The Space Surgeon will provide medical expertise in the unique environment of space. In this role, you will be responsible for performing surgeries, managing medical emergencies, and ensuring the overall health and well-being of the crew during the mission. Your expertise in space medicine will be crucial for maintaining crew readiness and addressing medical concerns in a challenging and high-risk environment.
            </p>
          </div>
        </li>

        <li className='position'>
          <div className='image'>
            <img src="../public/engineer.webp" alt="" />
          </div>
          <div className='details'>
            <h3>Engineer:</h3>
            <p>
                As an Engineer, you will be responsible for maintaining and repairing the ship's systems, ensuring everything runs smoothly. From propulsion systems to life support, your expertise will keep the crew safe and the mission on track. This role requires technical proficiency, problem-solving skills, and a passion for innovation.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}


export default Positions;
