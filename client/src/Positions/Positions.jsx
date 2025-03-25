
import { useState } from 'react';
import './Positions.css';

function Positions() {
  return (
    <div className="positions-container">
      <ul className='positions'>
      <li className='position'>
          <div className='image'>
          <img src="../public/commander.png" alt="" style={{ width: '150%' }} />
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
                Do you have a passion for luxury items, impeccable taste, and an eye for the finer things in life? We’re seeking a Purveyor of Fine Goods to join our crew and elevate every journey with the finest offerings in hand, whether it's exquisite snacks, rare collectibles, or a selection of artisan knick-knacks. As the go-to source for all things opulent, your role is to provide top-tier service and curate an exclusive experience for crew and passengers alike.
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
                We are seeking a highly skilled Military Linguist to join our elite crew. The Linguist will serve as the primary expert in language translation, cultural liaison, and communication support across a diverse range of operational environments. This position requires fluency in multiple languages, a keen understanding of military protocols, and the ability to function effectively under pressure, ensuring smooth and secure communication between crew members, allies, and local populations.
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
                You cook and you know things. We are looking for a skilled Cook to prepare delicious meals according to menu. You will cook dishes that will delight our customers with their taste and timely delivery. An excellent cook must be able to follow instructions in cooking and delivering well-prepared meals. They must be deft in moving around the kitchen and apt in
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
                Join our crew as a Deckhand and become an essential part of our operations. Your responsibilities will include maintaining the ship, assisting with cargo handling, and ensuring the safety of all crew members. This role requires physical stamina, a strong work ethic, and a willingness to learn the ropes of life at sea—or in space!
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
                We are seeking a highly skilled Space Surgeon to provide medical expertise in the unique environment of space. You will be responsible for performing surgeries, managing medical emergencies, and ensuring the health and well-being of the crew. This role demands precision, adaptability, and a deep understanding of space medicine.
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
