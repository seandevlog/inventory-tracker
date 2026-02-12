import { useNavigate } from "react-router-dom";

import styles from './home.module.css';

import Check from "@assets/check.svg";
import LetterX from "@assets/letterx.svg";

import config from '@config';
const { path } = config;

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.home}>
      <div>
        <div className={styles.intro}>
          <div className={styles.hero}>
            <img src='/inventory-hero.jpg' alt='Inventory Hero'/>
          </div>
          <div className={styles.title}>
            <p>Welcome to [ Your Company's ] Inventory Tracker</p>
          </div>
          <button
            className={styles.callToAction}
            onClick={() => navigate(path.manage.absolute)}
          >
            Access Your Inventory
          </button>
          <div>
            <p>Welcome to your company's inventory tracker, built specifically for you and the way your team works.</p>
            <p>Your central hub for managing inventory, tracking movement, monitoring orders, and staying in control of your operations. Every item, every transaction, every supplier, and every order now has a place, organized, searchable, and accessible when you need it.</p>
          </div>
        </div>
        <div className={styles.sectionTwo}>
          <div className={styles.ownership}>
            <p>This is your space.</p>
            <p>It was designed to simplify your workflow, reduce manual errors, and give you clear visibility into your inventory at all times. Whether you're checking stock levels, reviewing past transactions, managing suppliers, or preparing for your next order cycle, everything is structured to help you move faster and make better decisions.</p>
          </div>
          <div className={styles.purpose}>
            <div>
              <LetterX/>
              <p>No more spreadsheets</p>
            </div>
            <div>
              <LetterX/>
              <p>No more handwritten logs</p>
            </div>
            <div>
              <LetterX/>
              <p>No more disconnected systems</p>
            </div>
            <div>
              <Check/>
              <p>One streamlined platform, tailored for your company's needs</p>
            </div>
          </div>
        </div>

        <div className={styles.features}>
          <header>What You Can Do Here</header>
          <div>
            <ul>
              <li>
                <div>
                  <img src='/items-table.png' alt='Item Table'/>
                  <p>Monitor inventory levels in real time</p>
                </div>
              </li>
              <li>
                <div>
                  <img src='/view-stock.png' alt='View Stock'/>
                  <p>Track incoming and outgoing stock</p>
                </div>
              </li>
              <li>
                <div>
                  <img src='/view-order.png' alt='View Order'/>
                  <p>Manage supplier and order information</p>
                </div>
              </li>
              <li>
                <div>
                  <img src='/transactions-table.png' alt='Transactions Table'/>
                  <p>Review transaction history</p>
                </div>
              </li>
              <li>
                <div>
                  <img src='/filter-table-transaction.png' alt='Transactions Table'/>
                  <p>Search and filter data quickly and efficiently</p>
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <div>
                  <img src='/items-table.png' alt='Item Table'/>
                  <p>Monitor inventory levels in real time</p>
                </div>
              </li>
              <li>
                <div>
                  <img src='/view-stock.png' alt='View Stock'/>
                  <p>Track incoming and outgoing stock</p>
                </div>
              </li>
              <li>
                <div>
                  <img src='/view-order.png' alt='View Order'/>
                  <p>Manage supplier and order information</p>
                </div>
              </li>
              <li>
                <div>
                  <img src='/transactions-table.png' alt='Transactions Table'/>
                  <p>Review transaction history</p>
                </div>
              </li>
              <li>
                <div>
                  <img src='/filter-table-transaction.png' alt='Transactions Table'/>
                  <p>Search and filter data quickly and efficiently</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.sectionLast}>
          <div className={styles.vision}>
            <p>Every feature was built with usability and clarity in mind. The goal is simple: make inventory management easier, more transparent, and more reliable for your team.</p>
            <p>This platform belongs to you. It reflects your processes, your structure, and your operational flow. As your business grows, this system can grow with it, adapting to new requirements, additional products, expanded suppliers, and increased activity.</p>
          </div>

          <div className={styles.closing}>
            <p>Think of this as your operational command center, a tool built to support your day-to-day work and long-term success.</p>
            <div>
              <p>Welcome aboard.</p>
              <p>Your inventory system is ready.</p>
            </div>
          </div>
          <footer>
            <p>MIT License © 2026 Sean Delos Santos. <a href="https://spdx.org/licenses/MIT.html" target="_blank">Full license</a></p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Home;